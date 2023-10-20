import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCxin46tGPVY1cFaLxKeP-mChbZAnomdf0',
  authDomain: 'zippbike-c7608.firebaseapp.com',
  projectId: 'zippbike-c7608',
  storageBucket: 'zippbike-c7608.appspot.com',
  messagingSenderId: '677330034577',
  appId: '1:677330034577:web:2c6ec097a6fd6c60c64430',
  measurementId: 'G-PP44WCG164',
};

const firebase = initializeApp(firebaseConfig);
export default firebase;
