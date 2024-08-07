import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@components/index';
import { lazy } from 'react';

import {
  Intro,
  Main,
  CreateDiary,
  EditDiary,
  DiaryDetail,
  Share,
  Setting,
  MyPage,
  NonExistentDiary,
  RewardPage,
} from '@pages/index';

// const Intro = lazy(() => import('@pages/Intro/Intro'));
// const Main = lazy(() => import('@pages/Main/Main'));
// const CreateDiary = lazy(() => import('@pages/CreateDiary/CreateDiary'));
// const EditDiary = lazy(() => import('@pages/EditDiary/EditDiary'));
// const DiaryDetail = lazy(() => import('@pages/DiaryDetail/DiaryDetail'));
// const Share = lazy(() => import('@pages/Share/Share'));
// const Setting = lazy(() => import('@pages/Setting/Setting'));
// const MyPage = lazy(() => import('@pages/MyPage/MyPage'));
// const NonExistentDiary = lazy(
//   () => import('@pages/DiaryDetail/NonExistentDiary'),
// );
// const RewardPage = lazy(() => import('@pages/RewardPage/RewardPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Intro />,
  },
  {
    path: '/main',
    element: <Main />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/creatediary', element: <CreateDiary /> },
      { path: '/editdiary/:diaryId', element: <EditDiary /> },
      { path: '/diary/:diaryId', element: <DiaryDetail /> },
      { path: '/share', element: <Share /> },
      { path: '/setting', element: <Setting /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/non-existent-page', element: <NonExistentDiary /> },
      { path: '/rewardpage', element: <RewardPage /> },
    ],
  },
]);

export default router;
