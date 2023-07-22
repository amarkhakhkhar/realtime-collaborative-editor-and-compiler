import React, { useState, useEffect, useRef } from "react";
import ACTIONS from "../Actions";
import Editor from "@monaco-editor/react";
import { ToastContainer, toast } from "react-toastify";


const CodeEditorWindow = ({ onChange, language, code, theme, socketRef, roomId }) => {
  const [value, setValue] = useState(code || "");
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current.getValue());
  }

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        console.log("recieved", code)
        if (code !== undefined || code != null) {
          setValue(code);
          onChange("code", code);
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);


  const handleEditorChange = (value) => {
    const values = editorRef.current.getValue()
    const cpa= "asmar";
    setValue(value);
    onChange("code", value);
    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      code : values,
    });

  };




  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
        <Editor
          height="85vh"
          width={`100%`}
          language={language || "javascript"}
          value={value}
          theme={"vs-dark"}
          defaultValue="// some comment"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
        />
      </div>
    </>
  );
};
export default CodeEditorWindow;
