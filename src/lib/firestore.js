import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDtH8rGm3IHy5imZjKugFMSBySkzXWanSo",
    authDomain: "micro-blog-app.firebaseapp.com",
    databaseURL: "https://micro-blog-app.firebaseio.com",
    projectId: "micro-blog-app",
    storageBucket: "micro-blog-app.appspot.com",
    messagingSenderId: "178996777830",
    appId: "1:178996777830:web:c38d475fbb8c7b9802eea7",
    measurementId: "G-PQT9771JPC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;