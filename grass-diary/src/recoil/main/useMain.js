// recoil/main/useMain.js

import { useRecoilState, useRecoilValue } from 'recoil';
import { rewardPointState, grassCountState, grassColorState, grassListState } from './mainState';
import { fetchRewardPoint } from './mainSelectors';

export function useMain() {
  // 상태를 가져오고 설정하는 훅
  const [rewardPoint, setRewardPoint] = useRecoilState(rewardPointState);
  const [grassCount, setGrassCount] = useRecoilState(grassCountState);
  const [grassColor, setGrassColor] = useRecoilState(grassColorState);
  const [grassList, setGrassList] = useRecoilState(grassListState);

  // 선택자를 사용하여 비동기적으로 데이터를 가져오는 훅
  const fetchReward = useRecoilValue(fetchRewardPoint);

  // 필요한 경우 추가적인 로직을 여기에 구현할 수 있습니다.

  return { rewardPoint, setRewardPoint, grassCount, setGrassCount, grassColor, setGrassColor, grassList, setGrassList, fetchReward };
}
