var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var mouseDown = false
var startPoint = {
    x: undefined,
    y: undefined
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
    startPoint.x = x
    startPoint.y = y
    drawArc(x, y, 2, 0, Math.PI*2)
}

// 鼠标移动
canvas.onmousemove = function(e) {
    if(mouseDown) {
        var x = e.clientX
        var y = e.clientY
        drwaLine(startPoint.x, startPoint.y, x, y)
        startPoint.x = x
        startPoint.y = y
    }
}

// 鼠标松开
canvas.onmouseup = function(e) {
    mouseDown = false
}

function resizeCanvas() {
    var clientWidth = document.documentElement.clientWidth
    var clientHeight = document.documentElement.clientHeight
    canvas.width = clientWidth
    canvas.height = clientHeight
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