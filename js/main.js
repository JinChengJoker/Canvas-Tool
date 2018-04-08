var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var pen = document.getElementById('pen')
var eraser = document.getElementById('eraser')
var userDown = false  // 鼠标/手指是否按下
var isEraser = false  // 是否是橡皮擦模式
var startPoint = {  // 两点连线的初始坐标
    x: undefined,
    y: undefined
}

// 调整canvas尺寸
resizeCanvas()
window.onresize = function() {
    resizeCanvas()
}

pen.onclick = function() {
    pen.classList.add('active')
    eraser.classList.remove('active')
    isEraser = false
}
eraser.onclick = function() {
    pen.classList.remove('active')
    eraser.classList.add('active')
    isEraser = true
}
clear.onclick = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    pen.classList.add('active')
    eraser.classList.remove('active')
    isEraser = false
}

ctx.fillStyle = "red"
ctx.strokeStyle = "red"

// 特性检测
if(document.body.ontouchstart === undefined) {
    // 不支持触屏

    // 鼠标按下
    canvas.onmousedown = function(e) {
        userDown = true
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
        if(userDown) {
            var x = e.clientX
            var y = e.clientY
            if(isEraser) {
                ctx.clearRect(x-15, y-15, 30, 30)
            } else {
                drawLine(startPoint.x, startPoint.y, x, y)
                updateStartPoint(x, y)
            }
        }
    }

    // 鼠标松开
    canvas.onmouseup = function() {
        userDown = false
    }
} else {
    // 支持触屏

    // 手指按下
    canvas.ontouchstart = function(e) {
        var x = e.touches[0].clientX
        var y = e.touches[0].clientY
        updateStartPoint(x, y)
        if(isEraser) {
            ctx.clearRect(x-15, y-15, 30, 30)
        } else {
            drawArc(x, y, 2, 0, Math.PI*2)
        }
    }

    // 手指移动
    canvas.ontouchmove = function(e) {
        var x = e.touches[0].clientX
        var y = e.touches[0].clientY
        if(isEraser) {
            ctx.clearRect(x-15, y-15, 30, 30)
        } else {
            drawLine(startPoint.x, startPoint.y, x, y)
            updateStartPoint(x, y)
        }
    }
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
    ctx.beginPath()
    ctx.arc(x, y, r, start, end)
    ctx.fill()
}

function drawLine(startX, startY, endX, endY) {
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.closePath()
    ctx.stroke()
}