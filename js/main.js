var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var pen = document.getElementById('pen')
var eraser = document.getElementById('eraser')
var mouseDown = false  // 鼠标是否按下
var isEraser = false  // 是否是橡皮擦模式
var startPoint = {  // 两点连线的初始坐标
    x: undefined,
    y: undefined
}

pen.onclick = function() {
    isEraser = false
    this.disabled = true
    eraser.disabled = false
}
eraser.onclick = function() {
    isEraser = true
    this.disabled = true
    pen.disabled = false
}

resizeCanvas()

window.onresize = function() {
    resizeCanvas()
}

// 鼠标按下
canvas.onmousedown = function(e) {
    mouseDown = true
    var x = e.clientX
    var y = e.clientY
    updateStartPoint(x, y)
    if(isEraser) {
        ctx.clearRect(x-15, y-15, 30, 30)
    } else {
        drawArc(x, y, 2, 0, Math.PI*2)
    }
}

// 鼠标移动
canvas.onmousemove = function(e) {
    if(mouseDown) {
        var x = e.clientX
        var y = e.clientY
        if(isEraser) {
            ctx.clearRect(x-15, y-15, 30, 30)
        } else {
            drwaLine(startPoint.x, startPoint.y, x, y)
            updateStartPoint(x, y)
        }
    }
}

// 鼠标松开
canvas.onmouseup = function() {
    mouseDown = false
}

function resizeCanvas() {
    var clientWidth = document.documentElement.clientWidth
    var clientHeight = document.documentElement.clientHeight
    canvas.width = clientWidth
    canvas.height = clientHeight
}

function updateStartPoint(newX, newY) {
    startPoint.x = newX
    startPoint.y = newY
}

function drawArc(x, y, r, start, end) {
    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(x, y, r, start, end)
    ctx.fill()
}

function drwaLine(startX, startY, endX, endY) {
    ctx.lineWidth = 4
    ctx.strokeStyle = "red"
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.closePath()
    ctx.stroke()
}