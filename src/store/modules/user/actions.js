export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE',
    payload: { data},
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function isProviderUser (data) {
  return {
    type: '@user/IS_PROVIDER_USER',
    payload: { is_provider: data }
  }
}

export function passwordProfileUser (password) {
  return {
    type: '@user/PASSWORD_PROFILE_USER',
    payload: {password}
  }
}

export function updateProfileFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
