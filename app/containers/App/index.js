/* eslint-disable consistent-return */
/* eslint-disable default-case */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import PaymentPage from 'containers/PaymentPage/Loadable';
import HistoryPage from 'containers/HistoryPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import PrivacyPage from 'containers/PrivacyPage/Loadable';
import { ConfigProvider } from 'antd';
import Layout from 'components/App/Layout';
import { routes } from 'utils';
import 'antd/dist/antd.less';
import 'sanitize.css/sanitize.css';
import GlobalStyle from 'utils/styles';
import { useInjectSaga } from 'redux-injectors';
import PrivateRoute from 'components/Route/PrivateRoute';
import PublicRoute from 'components/Route/PublicRoute';
import enUS from 'antd/es/locale/en_US';
import plPL from 'antd/es/locale/pl_PL';
import deDE from 'antd/es/locale/de_DE';
import { makeSelectLocale } from 'providers/LanguageProvider/selectors';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import saga from './saga';
import { LoginCallback, SecureRoute } from '@okta/okta-react';

const stateSelector = createStructuredSelector({
  locale: makeSelectLocale(),
});

function App() {
  useInjectSaga({ key: 'app', saga });

  const { locale } = useSelector(stateSelector);

  const getLocale = (language) => {
    switch (language) {
      case 'de':
        return deDE;
      case 'pl':
        return plPL;
      case 'en':
        return enUS;
    }
  };

  return (
    <ConfigProvider locale={getLocale(locale)}>
      <div>
        <Switch>
          <Route
            exact
            path={routes.home.path}
            component={HomePage}
          />
          <Route
            path={routes.login.path}
            component={LoginPage}
          />
          <Route
            path={routes.register.path}
            component={RegisterPage}
          />
          <Route path={routes.privacy.path} component={PrivacyPage} />
          <Route
            exact
            path={routes.notFound.path}
            component={NotFoundPage}
          />

          <Layout>
            <Switch>
              <SecureRoute
                path={routes.dashboard.path}
                component={DashboardPage} 
              />
              <SecureRoute
                path={routes.payment.path}
                component={PaymentPage}
              />
              <SecureRoute
                path={routes.history.path}
                component={HistoryPage}
              />
              <SecureRoute
                path={routes.settings.path}
                component={SettingsPage}
              />
              <Route path="/implicit/callback" exact={true} component={LoginCallback}/>

              <Redirect to={routes.notFound.path} />
            </Switch>
          </Layout>
        </Switch>
        <GlobalStyle />
      </div>
    </ConfigProvider>
  );
}

export default hot(App);
