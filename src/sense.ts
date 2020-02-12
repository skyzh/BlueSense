import { FIREBASE_CONFIG } from './config/firebase'
import * as firebase from "firebase/app"
import "firebase/database"

firebase.initializeApp(FIREBASE_CONFIG)

const sense = firebase.database()

export default sense
