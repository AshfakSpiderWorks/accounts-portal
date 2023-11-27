importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAvqH_JXTzun3By_p8nA-EPq_MlR6sMJYw",
    authDomain: "works-omnisellcrm-com.firebaseapp.com",
    projectId: "works-omnisellcrm-com",
    storageBucket: "works-omnisellcrm-com.appspot.com",
    messagingSenderId: "710246423971",
    appId: "1:710246423971:web:5e005a1e05dcd7806a8e16",
    measurementId: "G-HRV7TRTBXB"
});

const messaging = firebase.messaging();
