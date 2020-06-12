import { all, takeLatest, call, put } from 'redux-saga/effects';
import { updateProfileFailure, updateProfileSuccess } from './actions';

import history from '../../../services/history';
import api from '../../../services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, bio} = payload.data;
    const response = yield call(api.put, 'users', {
      name,
      email,
      bio, 
    });
    yield put(updateProfileSuccess(response.data)) 
  } catch (error) {
    yield put(updateProfileFailure());
  }
}

export function* isProviderUser({payload}) {
  try {
    const {is_provider} = payload
    const response = yield call(api.put, 'users',{ 
      is_provider: is_provider
    });
    yield put(updateProfileSuccess(response.data))
    history.push('/');
  } catch (error) {
    yield put(updateProfileFailure());
    
  }
}

export function* passwordProfileUser({payload}) {
  try {
    const {password} = payload;
    const response = yield call(api.put, 'users',{ 
      password,
    });
    yield put(updateProfileSuccess(response.data))

  } catch (error) {
    yield put(updateProfileFailure());
  }
}




export default all([
  takeLatest('@user/UPDATE_PROFILE', updateProfile),
  takeLatest('@user/IS_PROVIDER_USER', isProviderUser),
  takeLatest('@user/PASSWORD_PROFILE_USER', passwordProfileUser),
]);
