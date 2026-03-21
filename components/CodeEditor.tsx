'use client';

import { Editor, EditorProps } from '@monaco-editor/react';

export default function CodeEditor(props: EditorProps) {
  return (
    <Editor
      height='450px'
      path='index.tsx'
      defaultLanguage='typescript'
      theme='vs-dark'
      onMount={(_, monaco) => {
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: true,
          noSyntaxValidation: false,
        });

        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
          target: monaco.languages.typescript.ScriptTarget.Latest,
          allowNonTsExtensions: true,
          moduleResolution:
            monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        });
      }}
      {...props}
    />
  );
}
