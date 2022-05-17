import React, { useRef } from "react";
// monaco
import Editor from "@monaco-editor/react";
// scss
import "./JsonTextArea.scss";
// redux
import { useDispatch } from "react-redux";
import { updateStressTestInputs } from "../../../redux/actions";

export default function JsonTextArea() {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const sampleData = '{\n "sampleData" : "sampleData" \n}';

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const dispatchBodyData = () => {
    let value = editorRef.current.getValue();
    if (value) {
      value = JSON.parse(value);
      dispatch(
        updateStressTestInputs({
          key: "body",
          value: value,
        })
      );
    }
  };

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
        onChange={dispatchBodyData}
      />
    </div>
  );
}
