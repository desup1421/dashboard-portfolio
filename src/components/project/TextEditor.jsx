import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Heading,
  List,
  Indent,
  IndentBlock,
  GeneralHtmlSupport,
  SourceEditing,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const TextEditor = ({ data, onChange }) => {
  const [editorData, setEditorData] = useState("");

  const handleEditorChange = (event, editor) => {
    const data = editor.getData(); // Mengambil isi editor
    setEditorData(data);
    onChange(data);
  };

  useEffect(() => {
    if (data) {
      setEditorData(data);
    }
  }, [data]);
  return (
    <CKEditor
      className="h-full"
      editor={ClassicEditor}
      data={editorData}
      onChange={handleEditorChange}
      onReady={(editor) => {
        editor.ui.view.editable.element.classList.add("h-60");
      }}
      config={{
        licenseKey: import.meta.env.VITE_CKEDITOR_KEY,
        plugins: [
          Essentials,
          Paragraph,
          Bold,
          Italic,
          Underline,
          Heading,
          List,
          Indent,
          IndentBlock,
          GeneralHtmlSupport,
          SourceEditing,
        ],
        toolbar: {
          items: [
            "sourceEditing",
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "bulletedList",
            "numberedList",
            "|",
            "outdent",
            "indent",
            "|",
            "undo",
            "redo",
            "|",
          ],
          shouldNotGroupWhenFull: false,
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: { name: "h1", classes: "font-bold text-3xl" },
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: { name: "h2", classes: "font-bold text-2xl" },
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: { name: "h2", classes: "font-bold text-xl" },
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
          ],
        },
      }}
    />
  );
};

export default TextEditor;
