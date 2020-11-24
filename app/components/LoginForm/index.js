/**
 *
 * LoginForm
 *
 */

import React from 'react';
import { StyledForm, StyledFormWrapper } from 'components/Form/styles';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { makeSelectCurrentStep } from 'containers/LoginPage/selectors';
import LoginAction from 'components/LoginAction';
import { PinCode, Password } from 'components/LoginContent';
import { nextStepAction } from 'containers/App/actions';
import { loginAction, loginSuccessAction } from 'containers/LoginPage/actions';
import { useOktaAuth } from '@okta/okta-react';
import { StyledButton, StyledFormActionsWrapper } from 'components/Form/styles';

const stateSelector = createStructuredSelector({
  currentStep: makeSelectCurrentStep(),
});

export default function LoginForm() {
  const { currentStep } = useSelector(stateSelector);
  const [form] = StyledForm.useForm();
  const dispatch = useDispatch();
  const { authService, authState } = useOktaAuth();

  const onNextStep = () => dispatch(nextStepAction());
  const onLogin = () => dispatch(loginAction());
  const onLoginWithOkta = (auth) => dispatch(loginSuccessAction(auth.user, auth.token));

  const onValidateFields = async () => {
    try {
      await form.validateFields();

      if (currentStep === steps.length - 1) {
        onLogin();
      } else {
        onNextStep();
      }
    } catch (error) {
      Error(error);
    }
  };

  const loginWithOkta = () => {
    authService.login('/dashboard');
    const auth = {"user":{"uuid":"d11cb4f7-3ac9-42ed-83ed-c56b7e473ed9","firstName":"Thomas","lastName":"Grist","email":"tjgrst@gmail.com","avatar":null,"userAuth":{"uuid":"74a76ecf-4a72-4cb4-87b7-148407718efb","pinCode":226911,"lastSuccessfulLoggedDate":"2020-11-13T05:55:12.462Z","lastFailedLoggedDate":null,"lastLogoutDate":"2020-11-13T05:59:21.347Z"},"userConfig":{"uuid":"bad0499a-56a9-4243-b567-e04890aee563","notificationCount":2,"messageCount":1,"currency":{"uuid":"f57d8898-0d16-47fc-85c6-556db0424dc0","name":"USD","currentExchangeRate":0.2626876977}}},"token":{"expiresIn":"3600","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZDExY2I0ZjctM2FjOS00MmVkLTgzZWQtYzU2YjdlNDczZWQ5Iiwicm9sZSI6IlVTRVJfUk9MRSIsImlhdCI6MTYwNTI0Nzg5MX0.gmVVgvRLeiQ8f0qgxc1ZQhyq9qbtlFQf8afz9SquelI"}}    
    onLoginWithOkta(auth);
  }

  const steps = [
    { content: <PinCode onValidateFields={onValidateFields} /> },
    { content: <Password onValidateFields={onValidateFields} /> },
  ];

  return (
    <StyledFormWrapper>
      <StyledForm centered="true" form={form} layout="vertical" name="login">
        {steps[currentStep].content}
      </StyledForm>

      <LoginAction steps={steps} onValidateFields={onValidateFields} />

      <StyledFormActionsWrapper>
        <StyledButton
          type="default"
          onClick={loginWithOkta}
        >
          Login with Okta
        </StyledButton>
      </StyledFormActionsWrapper>
      
    </StyledFormWrapper>
  );
}
