import { initializeApp } from 'firebase/app';
// import { getStorage } from 'firebase/storage';
// import { getFirestore } from 'firebase/firestore';
// import { getMessaging } from 'firebase/messaging';

//TODO: Remove these credentials and use the ones from own firebase project
// const firebaseConfig = {
//   apiKey: 'AIzaSyCn9oU3LJO0xMzg_6ERlRphHGXyf982UmI',
//   authDomain: 'unwind-time.firebaseapp.com',
//   projectId: 'unwind-time',
//   storageBucket: 'unwind-time.appspot.com',
//   messagingSenderId: '775168656101',
//   appId: '1:775168656101:web:f9812e99ed105d3cf00a0c',
//   measurementId: 'G-KC6K3146SH',
// };

//TODO restrict this to only work on our domain:
// https://medium.com/@devesu/how-to-secure-your-firebase-project-even-when-your-api-key-is-publicly-available-a462a2a58843#:~:text=Save-,How%20to%20secure%20your%20Firebase%20project%20even%20when%20your%20API,Firebase%20config%20file%20from%20public.
const firebaseConfig = {
  apiKey: 'AIzaSyDS0dUwKTNgpVbn664v-Et9InC0OxWYGnE',
  authDomain: 'helper-duck.firebaseapp.com',
  projectId: 'helper-duck',
  storageBucket: 'helper-duck.appspot.com',
  messagingSenderId: '666137514283',
  appId: '1:666137514283:web:2909248c1b3a2dc311756e',
  measurementId: 'G-NY6WE3N9ZQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app);
// const messaging = getMessaging(app);

export { app };
