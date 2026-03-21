'use client';

import { Editor } from '@monaco-editor/react';
import { useState } from 'react';

export default function CodeEditorInput() {
  const [code, setCode] = useState('');

  return (
    <div className='group relative'>
      <div className='rounded-md border'>
        <Editor
          height='450px'
          path='index.tsx'
          defaultLanguage='typescript'
          theme='vs-dark'
          value={code}
          onMount={(_, monaco) => {
            monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
              {
                noSemanticValidation: true,
                noSyntaxValidation: false,
              },
            );

            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
              jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
              target: monaco.languages.typescript.ScriptTarget.Latest,
              allowNonTsExtensions: true,
              moduleResolution:
                monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            });
          }}
          onChange={(val) => setCode(val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
      <input type='hidden' name='codeExample' value={code} />
    </div>
  );
}
