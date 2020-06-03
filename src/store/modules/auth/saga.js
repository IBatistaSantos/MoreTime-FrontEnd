import { takeLatest, call, put, all } from 'redux-saga/effects';
import history from '../../../services/history';
import { signInSuccess, signFailure } from './actions';
import api from '../../../services/api';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (error) {
    yield put(signFailure());
  }
}

export function* forgotPassword({ payload }) {
  try {
    yield call(api.post, 'forgotpassword', {
      email: payload,
      redirect_url: 'http://localhost:3000/reset-password'
    });
    history.push('/reset-password');
  } catch (error) {
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, bio, password, is_provider } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      bio,
      password,
      is_provider,
    });
    history.push('/sign-in');
  } catch (error) {
    yield put(signFailure());
  }
}

export function* resetPassword({payload}) {
  try {
    const { token, password} = payload;
    yield call(api.put, 'resetepassword', {
      token,
      password,
    }); 
    history.push('/sign-in');
  } catch (error) {
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth.token;
  
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token.token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/FORGOT_PASSWORD', forgotPassword),
  takeLatest('@auth/RESET_PASSWORD', resetPassword),
]);
