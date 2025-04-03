import { useEffect, useState } from "react";

// Define the shape of the Pyodide object
declare global {
    interface Window {
        loadPyodide: (options: { indexURL: string }) => Promise<{ pyodide: PyodideInterface }>;
    }
}

// Define the Pyodide interface
interface PyodideInterface {
    runPython: (code: string) => unknown;
    loadPackage: (packageName: string | string[]) => Promise<void>;
    // Add other methods and properties as needed
}

const usePyodide = () => {
    const [pyodide, setPyodide] = useState<unknown | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPyodide = async () => {
            try {
                // Load Pyodide from the CDN
                const pyodide = await window.loadPyodide({
                    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.2/full/",
                });
                setPyodide(pyodide);
                setLoading(false);
            } catch (err) {
                setError(`Error loading Pyodide: ${err}`);
                setLoading(false);
            }
        };

        // Load Pyodide once the component is mounted
        loadPyodide();
    }, []);

    return { pyodide, loading, error };
};

export default usePyodide;
