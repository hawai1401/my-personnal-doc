'use client';

import { useState } from 'react';
import CodeEditor from './CodeEditor';

export default function CodeEditorInput() {
  const [code, setCode] = useState('');

  return (
    <div className='group relative'>
      <div className='rounded-md border'>
        <CodeEditor
          value={code}
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
