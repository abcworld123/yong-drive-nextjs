import { useDropzone } from 'react-dropzone';
import DndOverlay from './DndOverlay';

export default function DndWrapper({ onDrop, children }) {
  const { getRootProps, isDragAccept } = useDropzone({ onDrop, noClick: true, noKeyboard: true });

  return (
    <div className="min-h-screen" {...getRootProps()}>
      {children}
      <DndOverlay show={isDragAccept} />
    </div>
  );
}
