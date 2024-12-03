"use client"

// components/CodeEditor.tsx
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-terminal";

const CodeEditor = () => {
    const initialCode = "@app.route('/login')\n@secure_endpoint(rate_limit='1/second')\ndef login(username, password):\n    if not isvalid(username, password):\n       return jsonify({'error': 'Invalid details'}), 400\n\n   return jsonify({'message': 'success'}), 200";

    return (
        <AceEditor
            mode="python"                
            theme="terminal"              
            name="code-editor"
            fontSize={17}
            editorProps={{ $blockScrolling: true }}
            height="180px"
            width="550px"
            value={initialCode}
            onChange={(newValue) => console.log(newValue)}
            setOptions={{
                showLineNumbers: false,   
                showGutter: false,
                displayIndentGuides: false,
                highlightActiveLine: false,
            }}
        />
    );
};

export default CodeEditor;
