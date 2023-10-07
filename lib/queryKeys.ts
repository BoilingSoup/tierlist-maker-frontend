const RECENT_TIER_LISTS = "recent_tier_lists";
const USER = "user";
const TIER_LIST = "tierlist";
const INDEX = "index";

export const queryKeys = {
  recentTierLists() {
    return [RECENT_TIER_LISTS];
  },
  user() {
    return [USER];
  },
  tierList(id: string) {
    return [TIER_LIST, id];
  },
  userTierLists(userID: string) {
    return [userID];
  },
  publicTierListsIndex() {
    return [INDEX];
  },
};
