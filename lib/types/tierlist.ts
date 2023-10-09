export type TierListDisplayData = {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  updated_at: string;
  creator: {
    username: string;
    id: string;
  };
};
