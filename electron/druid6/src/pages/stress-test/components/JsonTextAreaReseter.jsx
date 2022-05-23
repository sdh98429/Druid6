import React, { useRef } from "react";
// monaco
import Editor from "@monaco-editor/react";
// scss
import "./JsonTextArea.scss";
// redux
import { useDispatch, useSelector } from "react-redux";
import { updateStressTestInputs } from "../../../redux/actions";

export default function JsonTextArea() {
  const { stressTestInputs } = useSelector((state) => ({
    stressTestInputs: state.stressTestInputs,
  }));
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const dispatchBodyData = () => {
    let value = editorRef.current.getValue();
    dispatch(
      updateStressTestInputs({
        key: "body",
        value: value,
      })
    );
  };

  return (
    <div className="JsonTextArea">
      <Editor
        height="100%"
        defaultLanguage="json"
        theme="light"
        defaultValue={stressTestInputs.body}
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
