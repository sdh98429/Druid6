import React, { useRef } from "react";
// monaco
import Editor from "@monaco-editor/react";
// scss
import "./JsonTextArea.scss";
// js file
import sampleData from "./sampledata";

export default function JsonTextArea() {
  const editorRef = useRef(null);
  const sampleData = '{\n "sampleData" : "sampleData" \n}';

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    // alert(editorRef.current.getValue());
    console.log(__dirname);
  }

  return (
    <div className="JsonTextArea">
      <Editor
        height="100%"
        defaultLanguage="json"
        theme="light"
        defaultValue={sampleData}
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
