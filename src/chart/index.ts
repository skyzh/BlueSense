import SenseCheckpoint from "../checkpoint"
import { roundDigit } from "../utils"

class Axis {
    minData: number
    maxData: number
    minPos: number
    maxPos: number

    constructor() {
        this.minData = 0
        this.maxData = 0
        this.minPos = 0
        this.maxPos = 0
    }

    static fromArray(data: number[], minPos: number, maxPos: number, margin: number): Axis {
        const axis = new Axis
        axis.maxData = Math.max(...data)
        axis.minData = Math.min(...data)
        const marginSize = (maxPos - minPos) * margin
        maxPos -= marginSize
        minPos += marginSize
        axis.minPos = minPos
        axis.maxPos = maxPos
        return axis
    }

    posOf(data: number): number {
        return (data - this.minData) / (this.maxData - this.minData) * (this.maxPos - this.minPos) + this.minPos
    }
}

export function setupCanvas(canvas: HTMLCanvasElement) {
    // Get the device pixel ratio, falling back to 1.
    const dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    const rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d')!;
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx
}

const STROKE_COLOR = "#2196F3"
const FILL_COLOR = "rgba(33,150,243,0.3)"

function truncateTime(t: number, step: number): number {
    return Math.floor(t / step) * step
}

function drawSeries(ctx: CanvasRenderingContext2D, name: string, offsetX: number, offsetY: number, width: number, height: number, data: number[], time: number[], field: string) {
    const N = data.length
    const maxY = height + offsetY
    const yMargin = 0.1
    const xMargin = 0.1
    const axisY = Axis.fromArray(data, maxY, offsetY, yMargin)
    const axisX = Axis.fromArray(time, offsetX, offsetX + width, xMargin)

    // draw data
    ctx.lineWidth = 2
    ctx.strokeStyle = STROKE_COLOR
    ctx.setLineDash([])
    ctx.beginPath()
    let firstCall = true
    ctx.moveTo(axisX.posOf(axisX.minData), maxY)
    for (let i = 0; i < N; i++) {
        const x = axisX.posOf(time[i])
        const y = axisY.posOf(data[i])
        if (firstCall) {
            ctx.moveTo(x, y)
            firstCall = false
        } else {
            ctx.lineTo(x, y)
        }
    }
    ctx.stroke()
    ctx.lineTo(axisX.posOf(axisX.maxData), maxY)
    ctx.lineTo(axisX.posOf(axisX.minData), maxY)
    ctx.lineTo(axisX.posOf(axisX.minData), axisX.posOf(data[0]))
    ctx.fillStyle = FILL_COLOR
    ctx.fill()

    // draw vertical split line
    firstCall = true
    ctx.strokeStyle = "#cccccc"
    ctx.setLineDash([8, 8])
    let lstTimeChunk = 0
    for (let i = 0; i < N; i++) {
        const x = axisX.posOf(time[i])
        const t = time[i]
        const tChunk = truncateTime(t, 3600)
        if (tChunk != lstTimeChunk) {
            if (!firstCall) {
                ctx.beginPath()
                ctx.moveTo(x, maxY)
                ctx.lineTo(x, axisY.maxPos)
                ctx.stroke()
            }
            lstTimeChunk = tChunk
            firstCall = false
        }
    }

    // draw horizontal split line

    ctx.beginPath()
    ctx.moveTo(axisX.minPos, axisY.maxPos)
    ctx.lineTo(axisX.maxPos, axisY.maxPos)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(axisX.minPos, axisY.minPos)
    ctx.lineTo(axisX.maxPos, axisY.minPos)
    ctx.stroke()

    // draw text
    ctx.fillStyle = "black"
    ctx.textAlign = "start"
    ctx.textBaseline = "bottom"
    ctx.font = "14px Merriweather"
    ctx.fillText(name, offsetX + width * xMargin, offsetY + 5)

    ctx.textAlign = "end"
    ctx.textBaseline = "middle"
    ctx.fillText(`${roundDigit(axisY.maxData, 2)}`, axisX.minPos, axisY.maxPos)
    ctx.fillText(`${roundDigit(axisY.minData, 2)}`, axisX.minPos, axisY.minPos)
}

function yPositionOf(id: number, n: number, height: number, margin: number): number {
    const content = 1 - margin
    const allPercent = content * n + margin * (n + 1)
    return height / allPercent * (content * id + margin * (id + 1))
}

function splitHeight(n: number, height: number, margin: number): number {
    const content = 1 - margin
    const allPercent = content * n + margin * (n + 1)
    return height / allPercent * content
}

export function drawCall(ctx: CanvasRenderingContext2D, width: number, height: number, data: SenseCheckpoint[]) {
    ctx.clearRect(0, 0, width, height)
    const time = data.map(d => d.time)
    const seriesHeight = splitHeight(5, height, 0.1)
    drawSeries(ctx, "Temperature  °C", 0, yPositionOf(0, 5, height, 0.1), width, seriesHeight, data.map(d => d.temp), time, "temp")
    drawSeries(ctx, "Humidity  %", 0, yPositionOf(1, 5, height, 0.1), width, seriesHeight, data.map(d => d.hum), time, "hum")
    drawSeries(ctx, "Pressure  kPa", 0, yPositionOf(2, 5, height, 0.1), width, seriesHeight, data.map(d => d.pa / 1000), time, "pa")
    drawSeries(ctx, "PM2.5  µg/m^3", 0, yPositionOf(3, 5, height, 0.1), width, seriesHeight, data.map(d => d.pm25), time, "pm25")
    drawSeries(ctx, "PM10  µg/m^3", 0, yPositionOf(4, 5, height, 0.1), width, seriesHeight, data.map(d => d.pm10), time, "pm10")
}
