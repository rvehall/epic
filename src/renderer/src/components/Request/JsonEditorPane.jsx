import React, { useRef, useEffect } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { json } from '@codemirror/lang-json';

const basicExtensions = [
  basicSetup,
  json(),
  EditorState.tabSize.of(2),
];

const JsonEditorPane = ({
  paneValue,
  setPaneValue,
  isEditable = true,
}) => {
  const editorRef = useRef();

  useEffect(() => {
    if (editorRef.current === null) return;

    const state = EditorState.create({
      doc: paneValue,
      extensions: [
        ...basicExtensions,
        EditorView.updateListener.of((view) => {
          if (view.docChanged) {
            setPaneValue(view.state.doc);
          }
        }),
        EditorView.editable.of(isEditable),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
    // eslint-disable-next-line
  }, [editorRef.current, paneValue]);

  return <div className="jsonBody" ref={editorRef}></div>;
}

export default JsonEditorPane;