import * as firebase from 'firebase-admin';
import * as serviceAccount from '../storage/firebase-service-account.json';

const params = {
  type: ( serviceAccount as any).type,
  projectId: ( serviceAccount as any).project_id,
  privateKeyId: ( serviceAccount as any).private_key_id,
  privateKey: ( serviceAccount as any).private_key,
  clientEmail: ( serviceAccount as any).client_email,
  clientId: ( serviceAccount as any).client_id,
  authUri: ( serviceAccount as any).auth_uri,
  tokenUri: ( serviceAccount as any).token_uri,
  authProviderX509CertUrl: ( serviceAccount as any).auth_provider_x509_cert_url,
  clientC509CertUrl: ( serviceAccount as any).client_x509_cert_url
};

let instance: any;

const initialize = (): void => {
  if (!instance) {
    instance = firebase.initializeApp({
      credential: firebase.credential.cert(params),
      databaseURL: 'https://archisdiningrat-site.firebaseio.com'
    });
  }
};

const getInstance = (): any => {
  if (!instance) {
    throw new Error('Not initialize');
  }
  return instance;
};

export {
  initialize,
  getInstance
};
