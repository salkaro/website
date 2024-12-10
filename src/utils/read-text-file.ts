export async function readTextFile(filePath: string) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error("Failed to fetch file");
        }
        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Error reading file:", error);
        return null;
    }
}