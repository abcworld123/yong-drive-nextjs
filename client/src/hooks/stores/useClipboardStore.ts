import create from 'zustand';
import type { ObjectInfo } from 'types/apis';

interface ClipboardStoreState {
  bucket: string;
  path: string;
  objects: ObjectInfo[];
  mode: string;
}

const useClipboardStore = create<ClipboardStoreState>((set) => ({
  bucket: '',
  path: '',
  objects: [],
  mode: null,
}));

export default useClipboardStore;
