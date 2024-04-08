import { atom } from 'recoil';

export const rewardPointState = atom({
  key: 'rewardPointState',
  default: null,
});

export const grassCountState = atom({
  key: 'grassCountState',
  default: null,
});

export const grassColorState = atom({
  key: 'grassColorState',
  default: null,
});

export const grassListState = atom({
  key: 'grassListState',
  default: [],
});
