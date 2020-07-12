import { FIREBASE_CONFIG } from './config/firebase'
import SenseCheckpoint from "./checkpoint"

export function getRealtimeReport() {
    return fetch(`${FIREBASE_CONFIG.databaseURL}/checkpoint/changning/minute.json?orderBy="time"&limitToLast=2`)
        .then(result => result.json())
}

export function queryRange(from: Date, to: Date): Promise<SenseCheckpoint[]> {
    const fromTimestamp = Math.round(from.getTime() / 1000)
    const toTimestamp = Math.round(to.getTime() / 1000)

    return fetch(`${FIREBASE_CONFIG.databaseURL}/checkpoint/changning/minute.json?orderBy="time"&startAt=${fromTimestamp}&endAt=${toTimestamp}`)
        .then(result => result.json())
        .then(result => {
            return new Promise(resolve => {
                const keys = Object.keys(result)
                const checkpoints: SenseCheckpoint[] = []
                keys.forEach(key => {
                    checkpoints.push(result[key] as SenseCheckpoint)
                })
                checkpoints.sort((a, b) => a.time - b.time)
                resolve(checkpoints)
            })
        })
}
