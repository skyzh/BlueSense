import { FIREBASE_CONFIG } from './config/firebase'

export function getRealtimeReport() {
    return fetch(`${FIREBASE_CONFIG.databaseURL}/checkpoint/changning/minute.json?orderBy="time"&limitToLast=1`)
        .then(result => result.json())
}
