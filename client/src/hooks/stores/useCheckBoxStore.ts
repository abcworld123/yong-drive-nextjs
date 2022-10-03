import create from 'zustand';

interface CheckBoxStoreState {
  chkSet: Set<string>;
  chkAll: boolean;
  refresh: object;
  setChkSet: (newSet: Set<string>) => void;
  toggleChkAll: () => void;
}

const useCheckBoxStore = create<CheckBoxStoreState>((set) => ({
  chkSet: new Set<string>(),
  chkAll: false,
  refresh: {},
  setChkSet: (newSet) => set((state) => ({ chkSet: newSet })),
  toggleChkAll: () => set((state) => ({ chkAll: !state.chkAll })),
}));

export default useCheckBoxStore;
