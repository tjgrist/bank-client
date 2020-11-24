/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, MERGE_USER_DATA } from './constants';

export function loginAction() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccessAction(user, token) {
  return {
    type: LOGIN_SUCCESS,
    user,
    token,
  };
}

export function loginErrorAction(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function mergeUserData(user) {
  return {
    type: MERGE_USER_DATA,
    user
  }
}
