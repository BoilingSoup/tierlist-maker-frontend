export type TierListDisplayData = {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  created_at: string;
  creator: {
    username: string;
    id: string;
  };
};

// these fields don't exist in display data
//
// tiers: {
//   tier: {
//     label: string;
//     color: string;
//   };
//   items: {
//     src: string;
//     text?: string;
//     alt?: string;
//   }[];
// }[];
