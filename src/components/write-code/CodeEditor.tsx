"use client";

// External Imports
import { Editor } from "@monaco-editor/react";
import { LoaderCircle, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Local Imports
import { getCache, setCache } from "@/utils/cache-helpers";
import OutputConsole from "./OutputConsole";

// Styles
import 'react-resizable/css/styles.css';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { Button } from "../ui/button";
import OptionsMenu from "./OptionsMenu";

// Pyodide Interface type
interface PyodideInterface {
    loadPackage: (pkg: string) => Promise<void>;
    loadPackagesFromImports: (code: string) => Promise<void>;
    runPythonAsync: (code: string) => Promise<unknown>;
}

declare global {
    interface Window {
        _pyodide?: PyodideInterface;
    }
}

const initialCode = {
    python: "print('Hello World!')",
    javascript: "console.log('Hello World!')",
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << \"Hello from C++!\" << endl;
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

    // Grid & minimap state
    const [gridVertical, setGridVertical] = useState<boolean>(false);
    const [miniMap, setMinimap] = useState<boolean>(false);

    // Pyodide ref & ready flag
    const pyodideRef = useRef<PyodideInterface | null>(null);
    const [pyodideReady, setPyodideReady] = useState<boolean>(false);

    // Load cached code & layout
    useEffect(() => {
        const cachedCode = getCache(cacheKey) as string;
        if (cachedCode) setCode(cachedCode);
        else setCache(cacheKey, code);

        const cachedGrid = getCache("gridVertical");
        if (cachedGrid) setGridVertical(cachedGrid === "true");
        else setCache("gridVertical", `${gridVertical}`);
    }, [code, gridVertical, cacheKey]);

    // Initialize Pyodide when Python is selected (using module script injection)
    useEffect(() => {
        if (language !== "python") return;

        // Create a <script type="module"> to import Pyodide ESM
        const moduleScript = document.createElement("script");
        moduleScript.type = "module";
        moduleScript.textContent = `
      import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.mjs';
      (async () => {
        const pyodide = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/'
        });
        await pyodide.loadPackage('micropip');
        window._pyodide = pyodide;
        window.dispatchEvent(new Event('pyodide-ready'));
      })();
    `;
        document.body.appendChild(moduleScript);

        // Handler when Pyodide is ready
        const onReady = () => {
            pyodideRef.current = window._pyodide!;
            setPyodideReady(true);
        };
        window.addEventListener('pyodide-ready', onReady);

        // Cleanup
        return () => {
            window.removeEventListener('pyodide-ready', onReady);
            document.body.removeChild(moduleScript);
            pyodideRef.current = null;
            setPyodideReady(false);
        };
    }, [language]);

    const handleEditorChange = (value: string = "") => {
        setCode(value);
        setCache(cacheKey, value);
    };

    const runPythonCode = async () => {
        if (!pyodideReady || !pyodideRef.current) {
            setOutput("Loading Python runtime...");
            return;
        }

        setIsRunning(true);
        setOutput("");

        try {
            setOutput("Loading packages...")
            await pyodideRef.current.loadPackagesFromImports(code);
            setOutput("")

            const captureCode = `
import sys
import io

sys.stdout = io.StringIO()
sys.stderr = io.StringIO()

# --- USER CODE START ---
${code}
# --- USER CODE END ---

__output__ = sys.stdout.getvalue()
__error__ = sys.stderr.getvalue()
`;

            await pyodideRef.current.runPythonAsync(captureCode);
            const out = await pyodideRef.current.runPythonAsync("__output__");
            const err = await pyodideRef.current.runPythonAsync("__error__");

            const finalOutput = [out, err].filter(Boolean).join("\n").trim();
            setOutput(finalOutput || "No output.");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            setOutput(`Error: ${message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const runJavaScriptCode = async () => {
        setIsRunning(true);
        try {
            const logs: string[] = [];
            const originalLog = console.log;
            console.log = (...args: unknown[]) => { logs.push(args.map(String).join(" ")); };
            try { new Function(code)(); }
            catch (e: unknown) { logs.push(`Error: ${(e as Error).message}`); }
            setOutput(logs.join("<span class='line-break'></span>") || "No output.");
            console.log = originalLog;
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : String(e);
            setOutput(`Error: ${message}`);
        } finally { setIsRunning(false); }
    };

    const runCppCode = async () => {
        setIsRunning(true);
        try {
            setOutput("Compiling and running...");
            const response = await fetch("https://cpp.wasm.run/api/compile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            });
            const resJson = await response.json();
            const out = [resJson.stdout, resJson.stderr]
                .filter(Boolean)
                .join("<span class='line-break'></span>");
            setOutput(out || "No output.");
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : String(e);
            setOutput(`Error: ${message}`);
        } finally { setIsRunning(false); }
    };

    const runCode = () => {
        switch (language) {
            case "python": runPythonCode(); break;
            case "javascript": runJavaScriptCode(); break;
            case "cpp": runCppCode(); break;
        }
    };

    const handleGridChange = () => {
        const next = !gridVertical;
        setGridVertical(next);
        setCache("gridVertical", `${next}`);
    };

    return (
        <div className="flex flex-col w-full gap-5">
            <div className="h-screen w-full">
                <ResizablePanelGroup
                    direction={gridVertical ? "vertical" : "horizontal"}
                    className="max-w-md rounded-lg border md:min-w-full"
                >
                    <ResizablePanel defaultSize={500}>
                        <div className="w-full flex justify-end gap-2 pr-2 mt-2">
                            <OptionsMenu
                                gridVertical={gridVertical}
                                handleGridChange={handleGridChange}
                                miniMap={miniMap}
                                setMinimap={setMinimap}
                            />
                            <Button
                                variant="ghost"
                                onClick={runCode}
                                disabled={isRunning}
                                className="rounded-sm h-9"
                            >
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
                        <OutputConsole key="output-console" output={output} />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default CodeEditor;
