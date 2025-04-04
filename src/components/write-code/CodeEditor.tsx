"use client";

// External Imports
import { Editor } from "@monaco-editor/react";
import { useState, useEffect } from "react";

// Local Imports
import OutputConsole from "./OutputConsole";
import ResizeableGrid from "@/components/layout/ResizeableGrid";

// Styles
import 'react-resizable/css/styles.css';


declare global {
    interface Window {
        brython: () => void;
    }
}

const TutorialCodeEditor = () => {
    const [code, setCode] = useState<string>("print('Hello World!')"); // Code from the editor
    const [output, setOutput] = useState<string>(""); // Output of the Python code
    const [isRunning, setIsRunning] = useState<boolean>(false); // Track if code is running

    useEffect(() => {
        // Load Brython environment
        const brythonScript = document.createElement("script");
        brythonScript.src = "https://cdn.jsdelivr.net/npm/brython@3.13.0/brython.min.js";
        brythonScript.onload = () => {
            window.brython(); // Initialize Brython after loading
        };
        document.body.appendChild(brythonScript);

        const brythonStdlibScript = document.createElement("script");
        brythonStdlibScript.src = "https://cdn.jsdelivr.net/npm/brython@3.13.0/brython_stdlib.js";
        document.body.appendChild(brythonStdlibScript);
    }, []);

    const handleEditorChange = (value: string = "") => {
        setCode(value);
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
    exec("""${code.replace(/"/g, '\\"')}""")
except Exception as e:
    print(f"Error: {e}")

# Bind the output directly to the provided container ID
document["output-console"].textContent = "".join(sys.stdout.output)
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
                document.getElementById(outputContainerId)?.textContent || "No output.";
            setOutput(result);

            // Cleanup the script
            document.body.removeChild(pythonScript);
        } catch (error) {
            setOutput(`Error: ${error}`);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="flex flex-col w-full gap-5">
            <div className="w-full flex justify-end">
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
                            rows={2}
                            cols={1}
                            minSize={200}
                            cellClassName="rounded-lg bg-consoleGrey p-2 w-full h-full"
                            initialHeights={["50%", "50%"]}
                            initialWidths={["100%"]}
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

export default TutorialCodeEditor;
