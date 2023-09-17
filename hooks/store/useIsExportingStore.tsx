import { create } from "zustand";

type IsExportingStore = {
  value: boolean;
  setValue: (newValue: boolean) => void;
};

export const useIsExportingStore = create<IsExportingStore>((set) => ({
  value: false,
  setValue: (newValue: boolean) => set({ value: newValue }),
}));
