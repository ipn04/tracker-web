import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import UserApi from './UserApi';

export interface UserState {
  accessToken: string | null;
  userProfile: any;
}

const defaultState: UserState = {
  accessToken: null,
  userProfile: {}
};

const reducer = createSlice({
  name: 'User',
  initialState: defaultState,

  // Non API request reducers
  reducers: {
    clearUserToken: () => defaultState
  },

  // API request reducers
  extraReducers: (builder) => {
    builder
    //   .addMatcher(UserApi.endpoints.getUser.matchFulfilled, (state, { payload }) => ({
    //     ...state,
    //     userProfile: {
    //       ...state.userProfile,
    //       ...payload.dealerProfiles
    //     },
    //     ...payload
    //   }))
      .addMatcher(isAnyOf(UserApi.endpoints.login.matchFulfilled,
        UserApi.endpoints.signUp.matchFulfilled),
      (state, { payload }) => {
        const { access_token: accessToken, user } = payload;
        return {
          ...state,
          accessToken,
          user
        };
      })
      .addMatcher(UserApi.endpoints.logout.matchFulfilled, () => defaultState);
    //   .addMatcher(UserApi.endpoints.sendCode.matchFulfilled, (state, { meta }) => {
    //     const { email_or_mobile: emailOrMobile } = meta.arg.originalArgs;
    //     const { forgotPassword } = state;

    //     return {
    //       ...state,
    //       forgotPassword: {
    //         ...forgotPassword,
    //         emailOrMobile
    //       }
    //     };
    //   })
    //   .addMatcher(UserApi.endpoints.verifyCode.matchFulfilled, (state, { payload, meta }) => {
    //     const { verificationCode } = meta.arg.originalArgs;
    //     const { accountResetId } = payload;
    //     const { forgotPassword } = state;

    //     return {
    //       ...state,
    //       forgotPassword: {
    //         ...forgotPassword,
    //         verificationCode,
    //         accountResetId
    //       }
    //     };
    //   })
    //   .addMatcher(UserApi.endpoints.changeForgotPassword.matchFulfilled, (state) => ({
    //     ...state,
    //     forgotPassword: {
    //       ...defaultState.forgotPassword
    //     }
    //   }))
    //   .addMatcher(UserApi.endpoints.updateInformation.matchFulfilled, (state, { payload }) => ({
    //     ...state,
    //     user: payload
    //   }))
    //   .addMatcher(isAnyOf(
    //     UserApi.endpoints.changePassword.matchFulfilled,
    //     UserApi.endpoints.forceChangePassword.matchFulfilled
    //   ), (state) => ({
    //     ...state,
    //     is_password_changed: true
    //   }))
    //   .addMatcher(UserApi.endpoints.deleteProfile.matchFulfilled, () => ({
    //     ...defaultState
    //   }));
  }
});

const UserAction = reducer.actions;

export const {
  clearUserToken
} = UserAction;

export default reducer;
