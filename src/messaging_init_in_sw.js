import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAvqH_JXTzun3By_p8nA-EPq_MlR6sMJYw",
    authDomain: "works-omnisellcrm-com.firebaseapp.com",
    projectId: "works-omnisellcrm-com",
    storageBucket: "works-omnisellcrm-com.appspot.com",
    messagingSenderId: "710246423971",
    appId: "1:710246423971:web:5e005a1e05dcd7806a8e16",
    measurementId: "G-HRV7TRTBXB"
};

function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification permission granted.");
            const app = initializeApp(firebaseConfig);

            const messaging = getMessaging(app);
            getToken(messaging, {
                vapidKey:
                    "BJriQ5gAsNbImPLvNqyhdEI2nhvKuYbbY9GMCjpN10JZsuKGLM2CRPJha9lbTLOu11URIuFu5-qPfB9ZNtXfX4c",
            }).then((currentToken) => {
                if (currentToken) {
                    console.log("currentToken: ", currentToken);
                } else {
                    console.log("Can not get token");
                }
            });
        } else {
            console.log("Do not have permission!");
        }
    });
}

requestPermission();
