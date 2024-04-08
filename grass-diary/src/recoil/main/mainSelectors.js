
import { selector } from 'recoil';
import { memberIdAtom } from '@recoil/main/mainState';
import API from '@services';

export const fetchRewardPoint = selector({
  key: 'fetchRewardPoint',
  get: async ({ get }) => {
    const memberId = get(memberIdAtom);
    const response = await API.get(`/member/totalReward/${memberId}`);
    return response.data.rewardPoint;
  },
});
