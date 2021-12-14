const port = 8080;
const baseURL = `http://localhost:${port}`;
module.exports = {
  // The secret for the encryption of the jsonwebtoken
  JWTsecret: 'mysecret',
  baseURL: baseURL,
  port: port,
  // The credentials and information for OAuth2
  oauth2Credentials: {
    client_id:
			'500463387158-8jjaoecfp9n05itj91knfcn5itidbo7m.apps.googleusercontent.com',
    project_id: 'PodParty', // The name of your project
    auth_uri:
			'https://accounts.google.com/o/oauth2/auth?scope=openid%20profile%20email',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: 'wjI7_hFWsCVzpJe-Pn5tyebH',
    redirect_uris: [`${baseURL}/auth_callback`],
    scopes: [
      'profile',
      'email',
      'openid',
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
  },
};
