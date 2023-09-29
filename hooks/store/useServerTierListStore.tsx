import { create } from "zustand";
import { SaveTierListResponse } from "../../components/tierlist/types";

type ServerTierListStore = {
  responses: {
    [uuid: string]: {
      response: SaveTierListResponse;
      dataHash: string;
    };
  };
  add: (arg: AddParam) => void;
};

type AddParam = {
  uuid: string;
  response: SaveTierListResponse;
  dataHash: string;
};

// A client-side cache for the server-side data.
// Not using react query because the store data is not the same shape as server response data.
export const useServerTierListStore = create<ServerTierListStore>((set) => ({
  responses: {},
  add: ({ uuid, response, dataHash }: AddParam) =>
    set((state) => ({
      responses: {
        ...state.responses,
        [uuid]: {
          response,
          dataHash,
        },
      },
    })),
}));
