// External Imports
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-monokai";



interface CodeEditerProps {
    code: string;
    mode: string;
    width: string;
    height: string;
    fontSize: number;
    readOnly: boolean;
}

const CodeEditor: React.FC<CodeEditerProps> = ({ mode, code, readOnly, width, height, fontSize }) => {
    return (
        <AceEditor
            mode={mode}
            theme="monokai"
            name="code-editor"
            fontSize={fontSize}
            editorProps={{ $blockScrolling: true }}
            height={height}
            width={width}
            value={code}
            onChange={(newValue) => console.log(newValue)}
            setOptions={{
                showLineNumbers: true,
                showGutter: true,
                displayIndentGuides: false,
                highlightActiveLine: false,
                showPrintMargin: false,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
            }}
            readOnly={readOnly}
        />
    );
};

export default CodeEditor;
