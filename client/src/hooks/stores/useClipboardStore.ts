import create from 'zustand';

interface ClipboardStoreState {
  bucket: string;
  path: string;
  objects: string[];
  mode: string;
}

const useClipboardStore = create<ClipboardStoreState>((set) => ({
  bucket: '',
  path: '',
  objects: [],
  mode: null,
}));

export default useClipboardStore;
