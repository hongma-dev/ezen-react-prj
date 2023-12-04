import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvv5HZqtC0ppVMBaxfd2W-npTQ1xN3PgU",
  authDomain: "ezen-total-project-master.firebaseapp.com",
  projectId: "ezen-total-project-master",
  storageBucket: "ezen-total-project-master.appspot.com",
  messagingSenderId: "823466854137",
  appId: "1:823466854137:web:288583ea7d40f171cd8428",
  measurementId: "G-E8NSDKPF1E",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
