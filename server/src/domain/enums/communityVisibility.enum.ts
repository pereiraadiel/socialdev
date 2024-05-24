export const CommunityVisibility = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
} as const;

export type CommunityVisibility =
  (typeof CommunityVisibility)[keyof typeof CommunityVisibility];
