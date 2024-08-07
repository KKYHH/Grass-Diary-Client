import { selector } from 'recoil';
import { checkAuth } from '@utils/authUtils';
import { isAuthenticatedAtom, isLoadingAtom } from './authState';
import { CONSOLE_ERROR } from '@constants/message';

export const checkAuthSelector = selector<boolean>({
  key: 'checkAuthSelector',
  get: async ({ get }) => {
    get(isAuthenticatedAtom);

    try {
      const isLoggedIn: boolean = await checkAuth();
      return isLoggedIn;
    } catch (error) {
      console.error(CONSOLE_ERROR.LOGIN.FALSE + error);
      return false;
    }
  },

  set: ({ set }, newValue) => {
    set(isAuthenticatedAtom, newValue);
    set(isLoadingAtom, false);
  },
});
