import React, {type ReactNode} from 'react';
import DocChat from '@site/src/components/DocChat';

export default function Root({children}: {children: ReactNode}): ReactNode {
  return (
    <>
      {children}
      <DocChat />
    </>
  );
}
