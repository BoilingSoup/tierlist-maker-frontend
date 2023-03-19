import { create } from "zustand";

type ClientSideImageIDStore = {
  /** private, use getID() instead */
  _id: number;
  getID(): number;
};

export const useClientSideImageID = create<ClientSideImageIDStore>(
  (set, get) => ({
    _id: 1,
    getID() {
      let currID = get()._id;
      set((state) => ({ _id: state._id + 1 }));
      return currID;
    },
  })
);