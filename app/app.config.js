const oktapreview = `https://cloudnalu.oktapreview.com`;

const prodConfig = {
  url: oktapreview,
  issuer: `${oktapreview}/oauth2/default`,
  redirectUri: `${window.location.origin}/implicit/callback`,
  clientId: `0oa4op9istUMy3BcP1d6`,
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};

const devConfig = {
  url: oktapreview,
  issuer: `${oktapreview}/oauth2/default`,
  redirectUri: `${window.location.origin}/implicit/callback`,
  clientId: `0oa4ls58zN5pBW1hp1d6`,
  scopes: ['openid', 'profile', 'email'],
  pkce: true
}

const getConfig = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return devConfig;
    }
    else {
        return prodConfig;
    }
}

export default getConfig();

