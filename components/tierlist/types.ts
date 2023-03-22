export type TierListRowProps = {
  label: string;
  color: string;
  height: string;
  items: {
    src: string;
    alt: string;
    text: string;
  }[];
};

export type ClientSideImage = {
  id: number;
  src: string;
};

export type FullScreenProp = {
  state: boolean;
  toggle: () => Promise<void>;
};
