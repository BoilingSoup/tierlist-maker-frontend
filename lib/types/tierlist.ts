export type TierList = {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  tiers: {
    tier: {
      label: string;
      color: string;
    };
    items: {
      src: string;
      text?: string;
      alt?: string;
    }[];
  }[];
  creator: {
    username: string;
  };
  created_at: string;
};
