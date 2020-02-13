export default class SenseCheckpoint {
    temp: number
    hum: number
    pa: number
    pm25: number
    pm10: number
    time: number
    constructor() {
        this.temp = 0
        this.hum = 0
        this.pa = 0
        this.pm25 = 0
        this.pm10 = 0
        this.time = 0
    }
}
