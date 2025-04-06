"use client";

// External Imports
import { Editor } from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { CiGrid2H } from "react-icons/ci";
import { CiGrid2V } from "react-icons/ci";

// Local Imports
import ResizeableGrid from "@/components/layout/ResizeableGrid";
import OutputConsole from "./OutputConsole";

// Styles
import 'react-resizable/css/styles.css';
import { getCache, setCache } from "@/utils/cache-helpers";


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
            <div className="w-full flex justify-end gap-2">
                <button onClick={() => handleGridChange()} disabled={isRunning} className="bg-green-500 rounded-sm h-10 text-center px-2">
                    {gridVertical ? <CiGrid2V className="text-3xl" /> : <CiGrid2H className="text-3xl" />}
                </button>
                <button onClick={runCode} disabled={isRunning} className="bg-green-500 rounded-sm w-32 h-10">
                    {isRunning ? "Running..." : "Run"}
                </button>
            </div>

            <div className="h-screen w-full">
                <ResizeableGrid
                    rows={1}
                    cols={1}
                    minSize={200}
                    cellClassName=""
                    initialHeights={["100%"]}
                    initialWidths={["100%"]}
                    cellContent={[
                        <ResizeableGrid
                            key="resizeable-grid"
                            rows={gridVertical ? 2: 1}
                            cols={gridVertical ? 1: 2}
                            minSize={200}
                            cellClassName="rounded-lg bg-consoleGrey w-full h-full"
                            initialHeights={gridVertical ? ["50%", "50%"]: ["100%"]}
                            initialWidths={gridVertical ? ["100%"] : ["50%", "50%"]}
                            cellContent={[
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
                                />,
                                <OutputConsole
                                    key="output-console"
                                    output={output}
                                />
                            ]}
                        />
                    ]}
                />

            </div>
        </div>
    );
};

export default CodeEditor;
