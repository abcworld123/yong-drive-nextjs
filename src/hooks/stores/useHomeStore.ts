import create from 'zustand';
import type { ObjectInfo } from 'types/services';

interface HomeStoreState {
  bucket: string;
  path: string;
  objects: ObjectInfo[];
  chkSet: Set<string>;
  chkAll: boolean;
  setChkSet: (newSet: Set<string>) => void;
  toggleChkAll: () => void;
  uploadObject: (files: File[]) => void;
  reload: () => void;
}

const useHomeStore = create<HomeStoreState>((set) => ({
  bucket: '',
  path: '',
  objects: [],
  chkSet: new Set<string>(),
  chkAll: false,
  setChkSet: (newSet) => set((state) => ({ chkSet: newSet })),
  toggleChkAll: () => set((state) => ({ chkAll: !state.chkAll })),
  uploadObject: null,
  reload: null,
}));

export default useHomeStore;
