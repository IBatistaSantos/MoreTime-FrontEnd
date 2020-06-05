export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signUpRequest(name, email, bio, password, is_provider) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {
      name,
      email,
      bio,
      password,
      is_provider
    },
  };
}

export function forgotPassword(email) {
  return {
    type: '@auth/FORGOT_PASSWORD',
    payload: email,
  };
}

export function resetPassword(token,email) {
  return {
    type: '@auth/RESET_PASSWORD',
    payload: {
      token,
      email,
    },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}


export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
