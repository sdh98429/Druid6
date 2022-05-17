// react-json-editor-ajrm
import React, { useRef } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

export default function JsonTextArea() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    // alert(editorRef.current.getValue());
    console.log(__dirname)
  }

  return (
    <div className="JsonTextArea">
      <button onClick={showValue}>Show value</button>
      <Editor
        height="90vh"
        defaultLanguage="json"
        defaultValue="// some comment"
        options={{
          automaticLayout: true,
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          formatOnPaste: true,
          formatOnType: true,
          rulers: false,
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
