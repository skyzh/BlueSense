import SenseCheckpoint from "../checkpoint"

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
        const marginSize = (maxPos - minPos) * margin / 2
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

function drawSeries(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number, width: number, height: number, data: number[], time: number[], field: string) {
    const N = data.length
    const maxY = height + offsetY
    const axisY = Axis.fromArray(data, maxY, offsetY, 0.1)
    const axisX = Axis.fromArray(time, offsetX, offsetX + width, 0.1)
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
    ctx.strokeStyle = STROKE_COLOR
    ctx.stroke()
    ctx.lineTo(axisX.posOf(axisX.maxData), maxY)
    ctx.lineTo(axisX.posOf(axisX.minData), maxY)
    ctx.lineTo(axisX.posOf(axisX.minData), axisX.posOf(data[0]))
    ctx.fillStyle = FILL_COLOR
    ctx.fill()
}

export function drawCall(ctx: CanvasRenderingContext2D, width: number, height: number, data: SenseCheckpoint[]) {
    ctx.clearRect(0, 0, width, height)
    const seriesHeight = height / 5
    const time = data.map(d => d.time)
    drawSeries(ctx, 0, 0, width, seriesHeight, data.map(d => d.temp), time, "temp")
    drawSeries(ctx, 0, seriesHeight, width, seriesHeight, data.map(d => d.hum), time, "hum")
    drawSeries(ctx, 0, seriesHeight * 2, width, seriesHeight, data.map(d => d.pa), time, "pa")
    drawSeries(ctx, 0, seriesHeight * 3, width, seriesHeight, data.map(d => d.pm25), time, "pm25")
    drawSeries(ctx, 0, seriesHeight * 4, width, seriesHeight, data.map(d => d.pm10), time, "pm10")
}
