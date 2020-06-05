import { takeLatest, call, put, all } from 'redux-saga/effects';
import history from '../../../services/history';
import { signInSuccess, signFailure } from './actions';
import api from '../../../services/api';
import {toast} from 'react-toastify'
export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token.token}`;
    toast.success('Bem-vindo de volta')
    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (error) {
    toast.error('Ocorreu um erro no login, verifique as suas informações')
    yield put(signFailure());
  }
}

export function* forgotPassword({ payload }) {
  try {
    yield call(api.post, 'forgotpassword', {
      email: payload,
      redirect_url: 'http://localhost:3000/reset-password'
    });
    toast.success('Enviamos o código para o seu email, utilize-o para resetar sua senha')
    history.push('/reset-password');
  } catch (error) {
    toast.error('Erro ao enviar o token para o email, verique se esse email é válido')
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
    toast.success('Cadastro feito com sucesso')
    history.push('/sign-in');
  } catch (error) {
    toast.error('Erro ao fazer o cadastro, verifique as informações')
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
    toast.success('Resete de senha feita com sucesso')
    history.push('/sign-in');
  } catch (error) {
    toast.error('Erro ao resetar sua senha, tente novamente')
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload.auth.token) return;
  const { token } = payload.auth.token;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/sign-in')
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/FORGOT_PASSWORD', forgotPassword),
  takeLatest('@auth/RESET_PASSWORD', resetPassword),
]);
