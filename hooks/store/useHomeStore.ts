import create from 'zustand';
import { ObjectInfo } from 'types/services';

interface HomeStoreState {
  bucket: string,
  path: string,
  objects: ObjectInfo[],
  chkAll: boolean,
  toggleChkAll: () => void,
  reload: () => void,
}

const useHomeStore = create<HomeStoreState>((set) => ({
  bucket: '',
  path: '',
  objects: [],
  chkAll: false,
  toggleChkAll: () => set((state) => ({ chkAll: !state.chkAll })),
  reload: null,
}));

export default useHomeStore;
