import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDQ2LgV94QokJoTCeTDvG4ceEqXXFxas9Q",
    authDomain: "walkie-talkie-19b23.firebaseapp.com",
    projectId: "walkie-talkie-19b23",
    storageBucket: "walkie-talkie-19b23.appspot.com",
    messagingSenderId: "795079956966",
    appId: "1:795079956966:web:a0af4c965f38993350de27",
    measurementId: "G-7920JNEDD8"
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()