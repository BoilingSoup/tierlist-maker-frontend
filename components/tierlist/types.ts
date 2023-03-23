export type TierListRowProps = {
  label: string;
  color: string;
  height: string;
  items: {
    src: string;
    // alt: string;
    // text: string;
  }[];
};

export type InitialData = {
  sidebar: ClientSideImage[];
  rows: (Omit<TierListRowProps, "height"> & { key: number })[];
};

export type ClientSideImage = {
  id: number;
  src: string;
};

export type FullScreenProp = {
  state: boolean;
  toggle: () => Promise<void>;
};
