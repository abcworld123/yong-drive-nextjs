import create from 'zustand';
import type { ObjectInfo } from 'types/services';

interface HomeStoreState {
  bucket: string;
  path: string;
  objects: ObjectInfo[];
  chkSet: Set<string>;
  setChkSet: (newSet: Set<string>) => void;
  chkAll: boolean;
  toggleChkAll: () => void;
  reload: () => void;
}

const useHomeStore = create<HomeStoreState>((set) => ({
  bucket: '',
  path: '',
  objects: [],
  chkSet: new Set<string>(),
  setChkSet: (newSet) => set((state) => ({ chkSet: newSet })),
  chkAll: false,
  toggleChkAll: () => set((state) => ({ chkAll: !state.chkAll })),
  reload: null,
}));

export default useHomeStore;
