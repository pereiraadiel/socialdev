export const CommunityVisibility = {
  PUBLIC: 0,
  PRIVATE: 1,
};

export type CommunityVisibility =
  (typeof CommunityVisibility)[keyof typeof CommunityVisibility];
