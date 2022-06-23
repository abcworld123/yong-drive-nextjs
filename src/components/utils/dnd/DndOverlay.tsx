import Image from 'next/image';
import { memo } from 'react';
import type { DndOverlayProps } from 'types/props';

function DndOverlay({ show }: DndOverlayProps) {
  return (
    <div className={`dnd-outer ${show ? '' : 'opacity-0'}`}>
      <div className="dnd-inner">
        <Image src="/img/dnd.png" width={160} height={160} />
        <p className="">여기에 드롭하여 업로드</p>
      </div>
    </div>
  );
}

export default memo(DndOverlay);
