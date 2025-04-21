"use client";

// External Imports
import { Editor } from "@monaco-editor/react";
import { LoaderCircle, Play } from "lucide-react";
import { useState, useEffect } from "react";

// Local Imports
import { getCache, setCache } from "@/utils/cache-helpers";
import OutputConsole from "./OutputConsole";

// Styles
import 'react-resizable/css/styles.css';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { Button } from "../ui/button";
import OptionsMenu from "./OptionsMenu";


declare global {
    interface Window {
        brython: () => void;
    }
}



const initialCode = {
    "python": "print('Hello World!')",
    "javascript": "console.log('Hello World!')",
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello from C++!" << endl;
    return 0;
}`
};

interface CodeEditorProps {
    language: "python" | "javascript" | "cpp";
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language }) => {
    const [code, setCode] = useState<string>(initialCode[language]);
    const [output, setOutput] = useState<string>("");
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const cacheKey = `code-${language}`;

    const [gridVertical, setGridVertical] = useState<boolean>(false);
    const [miniMap, setMinimap] = useState<boolean>(false);

    useEffect(() => {
        if (language === "python") {
            if (
                !document.querySelector(
                    'script[src="https://cdn.jsdelivr.net/npm/brython@3.13.0/brython.min.js"]'
                )
            ) {
                const brythonScript = document.createElement("script");
                brythonScript.src =
                    "https://cdn.jsdelivr.net/npm/brython@3.13.0/brython.min.js";
                brythonScript.onload = () => {
                    window.brython();
                };
                document.body.appendChild(brythonScript);
            }

            if (
                !document.querySelector(
                    'script[src="https://cdn.jsdelivr.net/npm/brython@3.13.0/brython_stdlib.js"]'
                )
            ) {
                const brythonStdlibScript = document.createElement("script");
                brythonStdlibScript.src =
                    "https://cdn.jsdelivr.net/npm/brython@3.13.0/brython_stdlib.js";
                document.body.appendChild(brythonStdlibScript);
            }
        }
    }, [language]);

    useEffect(() => {
        // Get cached code from local storage
        const cachedCode = getCache(cacheKey) as string;
        if (cachedCode) {
            setCode(cachedCode);
        } else {
            setCache(cacheKey, code); // Set initial code in cache
        }

        // Check and load grid state from local storage
        const cachedGridState = getCache("gridVertical");
        if (cachedGridState) {
            setGridVertical(cachedGridState === "true"); // Convert string to boolean
        } else {
            setCache("gridVertical", `${gridVertical}`); // Set initial grid state in cache
        }
    }, [code, gridVertical, cacheKey]);

    const handleEditorChange = (value: string = "") => {
        setCode(value);
        setCache(cacheKey, value)
    };

    const runPythonCode = async () => {
        setIsRunning(true);
        try {
            // Clear the output area
            setOutput("");

            // Wrap the Python code with sys.stdout redirection
            const wrappedCode = `
import sys
from browser import document

class OutputCatcher:
    def __init__(self):
        self.output = []

    def write(self, text):
        self.output.append(text)

    def flush(self):
        pass

sys.stdout = OutputCatcher()

try:
    exec('''${code.replace(/'/g, "\\'")}''')
except Exception as e:
    print(f"Error: {e}")

output_str = "\\n".join(sys.stdout.output)
document["output-console"].innerHTML = output_str.replace("\\n", "<span class='line-break'></span>")
`;

            // Use the existing "output-console" container
            const outputContainerId = "output-console";

            // Create a script tag for Python code
            const pythonScript = document.createElement("script");
            pythonScript.type = "text/python";
            pythonScript.textContent = wrappedCode;

            // Append the script and execute
            document.body.appendChild(pythonScript);

            // Allow time for Brython to execute and update the output container
            await new Promise((resolve) => setTimeout(resolve, 200)); // Small delay for execution

            // Read the output from the specified container
            const result =
                document.getElementById(outputContainerId)?.innerHTML || "No output.";
            setOutput(result);

            // Cleanup the script
            document.body.removeChild(pythonScript);
        } catch (error) {
            setOutput(`Error: ${error}`);
        } finally {
            setIsRunning(false);
        }
    };

    const runJavaScriptCode = async () => {
        setIsRunning(true);
        try {
            const logs: string[] = [];
            const originalLog = console.log;
            console.log = (...args) => {
                logs.push(args.map(String).join(" "));
            };

            try {
                // Safer than eval — isolates code
                new Function(code)();
            } catch (e) {
                logs.push(`Error: ${(e as Error).message}`);
            }

            setOutput(logs.join("<span class='line-break'></span>") || "No output.");
            console.log = originalLog;
        } catch (error) {
            setOutput(`Error: ${error}`);
        } finally {
            setIsRunning(false);
        }
    };

    const runCppCode = async () => {
        setIsRunning(true);
        try {
            setOutput("Compiling and running...");

            const response = await fetch("https://cpp.wasm.run/api/compile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });

            const result = await response.json();

            if (result.stdout || result.stderr) {
                setOutput(
                    [result.stdout, result.stderr]
                        .filter(Boolean)
                        .join("<span class='line-break'></span>") || "No output."
                );
            } else {
                setOutput("No output.");
            }
        } catch (error) {
            setOutput(`Error: ${error}`);
        } finally {
            setIsRunning(false);
        }
    };

    const runCode = () => {
        switch (language) {
            case "python":
                runPythonCode();
                break;
            case "javascript":
                runJavaScriptCode();
                break;
            case "cpp":
                runCppCode();
                break;
        }
    };

    function handleGridChange() {
        setGridVertical(!gridVertical);
        setCache("gridVertical", `${!gridVertical}`); // Update cache with new grid state
    }

    return (
        <div className="flex flex-col w-full gap-5">
            <div className="h-screen w-full">
                <ResizablePanelGroup
                    direction={gridVertical ? "vertical" : "horizontal"}
                    className="max-w-md rounded-lg border md:min-w-full"
                >
                    <ResizablePanel defaultSize={500}>
                        <div className="w-full flex justify-end gap-2 pr-2 mt-2">
                            <OptionsMenu gridVertical={gridVertical} handleGridChange={handleGridChange} miniMap={miniMap} setMinimap={setMinimap} />
                            <Button variant="ghost" onClick={runCode} disabled={isRunning} className="rounded-sm h-9">
                                {isRunning ? <LoaderCircle /> : <Play />}
                            </Button>
                        </div>

                        <Editor
                            key="editor"
                            height="100%"
                            width="100%"
                            theme="vs-dark"
                            language={language}
                            value={code}
                            defaultValue={initialCode[language]}
                            options={{ minimap: { enabled: miniMap } }}
                            onChange={handleEditorChange}
                            className="rounded-lg p-2"
                        />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={500}>
                        <OutputConsole
                            key="output-console"
                            output={output}
                        />
                    </ResizablePanel>
                </ResizablePanelGroup>

            </div>
        </div>
    );
};

export default CodeEditor;
