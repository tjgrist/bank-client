/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */
import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import config from '../../app.config';

const Login = () => {
  const { oktaAuth } = useOktaAuth();

  useEffect(() => {
    const { issuer, clientId, redirectUri, scopes, url } = config.oidc;
    const widget = new OktaSignIn({
      baseUrl: url,
      clientId,
      redirectUri,
      logo: '/react.svg',
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to Cloudnalu using Okta',
        },
      },
      authParams: {
        // To avoid redirect do not set "pkce" or "display" here. OKTA-335945
        issuer,
        scopes,
      },
    });

    widget.renderEl(
      { el: '#sign-in-widget' },
      ({ tokens }) => {
        // Add tokens to storage
        const tokenManager = oktaAuth.tokenManager;
        tokenManager.add('idToken', tokens.idToken);
        tokenManager.add('accessToken', tokens.accessToken);

        // Return to the original URL (if auth was initiated from a secure route), falls back to the origin
        const fromUri = oktaAuth.getOriginalUri();
        window.location.assign(fromUri);
      },
      (err) => {
        throw err;
      },
    );
    
    return () => {
      widget.remove();
    }
  }, [oktaAuth]);

  return (
    <div>
      <div id="sign-in-widget" />
    </div>
  );
};
export default Login;