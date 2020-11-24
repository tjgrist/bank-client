import React from 'react';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { api, request, routes } from 'utils';
import { FormattedMessage } from 'react-intl';
import { LOGIN_REQUEST } from './constants';
import { makeSelectPassword, makeSelectPinCode } from './selectors';
import { loginSuccessAction, loginErrorAction } from './actions';
import messages from './messages';

export function* login() {

  const pinCode = yield select(makeSelectPinCode());
  const password = yield select(makeSelectPassword());

  // const requestURL = api.auth.login;

  // const requestParameters = {
  //   method: 'POST',
  //   headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ pinCode, password }),
  // };

  try {
    const auth = {"user":{"uuid":"d11cb4f7-3ac9-42ed-83ed-c56b7e473ed9","firstName":"Thomas","lastName":"Grist","email":"tjgrst@gmail.com","avatar":null,"userAuth":{"uuid":"74a76ecf-4a72-4cb4-87b7-148407718efb","pinCode":226911,"lastSuccessfulLoggedDate":"2020-11-13T05:55:12.462Z","lastFailedLoggedDate":null,"lastLogoutDate":"2020-11-13T05:59:21.347Z"},"userConfig":{"uuid":"bad0499a-56a9-4243-b567-e04890aee563","notificationCount":2,"messageCount":1,"currency":{"uuid":"f57d8898-0d16-47fc-85c6-556db0424dc0","name":"USD","currentExchangeRate":0.2626876977}}},"token":{"expiresIn":"3600","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZDExY2I0ZjctM2FjOS00MmVkLTgzZWQtYzU2YjdlNDczZWQ5Iiwicm9sZSI6IlVTRVJfUk9MRSIsImlhdCI6MTYwNTI0Nzg5MX0.gmVVgvRLeiQ8f0qgxc1ZQhyq9qbtlFQf8afz9SquelI"}}

    // const { user, token } = yield call(request, requestURL, requestParameters);
    
    yield put(loginSuccessAction(auth.user, auth.token));
  } catch (error) {
    let message;

    switch (error.statusCode) {
      case 404:
        message = (
          <FormattedMessage
            {...messages.accountNotFound}
            values={{ pinCode }}
          />
        );
        break;
      case 403:
        message = <FormattedMessage {...messages.passwordInvalid} />;
        break;
      default:
        message = <FormattedMessage {...messages.serverError} />;
        break;
    }

    yield put(loginErrorAction(message));
  }
}

export default function*  () {
  yield takeLatest(LOGIN_REQUEST, login);
}
