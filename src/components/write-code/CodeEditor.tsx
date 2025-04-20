"use client";

// External Imports
import { Editor } from "@monaco-editor/react";
import { CiGrid2H } from "react-icons/ci";
import { CiGrid2V } from "react-icons/ci";
import { Columns2, LoaderCircle, Play, Rows2 } from "lucide-react";
import { useState, useEffect } from "react";

// Local Imports
import { getCache, setCache } from "@/utils/cache-helpers";
import OutputConsole from "./OutputConsole";

// Styles
import 'react-resizable/css/styles.css';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { Button } from "../ui/button";


declare global {
    interface Window {
        brython: () => void;
    }
}

const CodeEditor = () => {
    const [code, setCode] = useState<string>("print('Hello World!')"); // Code from the editor
    const [output, setOutput] = useState<string>(""); // Output of the Python code
    const [isRunning, setIsRunning] = useState<boolean>(false); // Track if code is running
    const cacheKey = "code-python";

    const [gridVertical, setGridVertical] = useState<boolean>(false);

    useEffect(() => {
        // Check and load Brython script if not already present
        if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/brython@3.13.0/brython.min.js"]')) {
            const brythonScript = document.createElement("script");
            brythonScript.src = "https://cdn.jsdelivr.net/npm/brython@3.13.0/brython.min.js";
            brythonScript.onload = () => {
                window.brython(); // Initialize Brython after loading
            };
            document.body.appendChild(brythonScript);
        }

        // Check and load Brython standard library script if not already present
        if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/brython@3.13.0/brython_stdlib.js"]')) {
            const brythonStdlibScript = document.createElement("script");
            brythonStdlibScript.src = "https://cdn.jsdelivr.net/npm/brython@3.13.0/brython_stdlib.js";
            document.body.appendChild(brythonStdlibScript);
        }
    }, []);

    useEffect(() => {
        // Get cached code from local storage
        const cachedCode = getCache(cacheKey);
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
    }, [code, gridVertical]);

    const handleEditorChange = (value: string = "") => {
        setCode(value);
        setCache(cacheKey, value)
    };

    const runCode = async () => {
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

    function handleGridChange() {
        setGridVertical(!gridVertical);
        setCache("gridVertical", `${!gridVertical}`); // Update cache with new grid state
    }

    return (
        <div className="flex flex-col w-full gap-5">
            <div className="w-full flex justify-start gap-2">
                <Button variant="ghost" onClick={() => handleGridChange()} disabled={isRunning} className="rounded-sm h-9">
                    {gridVertical ? <Columns2 /> : <Rows2 />}
                </Button>
                <Button variant="ghost" onClick={runCode} disabled={isRunning} className="rounded-sm h-9">
                    {isRunning ? <LoaderCircle /> : <Play />}
                </Button>
            </div>

            <div className="h-screen w-full">
                <ResizablePanelGroup
                    direction={gridVertical ? "vertical": "horizontal"}
                    className="max-w-md rounded-lg border md:min-w-full"
                >
                    <ResizablePanel defaultSize={500}>
                        <Editor
                            key="editor"
                            height="100%"
                            width="100%"
                            theme="vs-dark"
                            language="python"
                            value={code}
                            defaultValue={`print("Hello World!")`}
                            options={{ minimap: { enabled: false } }}
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
