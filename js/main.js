var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var mouseDown = false  // 鼠标是否按下
var isEraser = false  // 是否是橡皮擦模式
var startPoint = {  // 两点连线的初始坐标
    x: undefined,
    y: undefined
}

// 重置canvas
resetCanvas()
window.onresize = function() {
    resetCanvas()
}

// 监听用户操作
listenUser()

// 特性检测
if(document.body.ontouchstart === undefined) {
    // 不支持触屏

    // 鼠标按下
    canvas.onmousedown = function(e) {
        mouseDown = true
        var x = e.clientX
        var y = e.clientY
        updateStartPoint(x, y)
        if(isEraser) {
            ctx.clearRect(x-10, y-10, 20, 20)
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
                ctx.clearRect(x-10, y-10, 20, 20)
            } else {
                drawLine(startPoint.x, startPoint.y, x, y)
                updateStartPoint(x, y)
            }
        }
    }

    // 鼠标松开
    canvas.onmouseup = function() {
        mouseDown = false
    }
} else {
    // 支持触屏

    // 手指按下
    canvas.ontouchstart = function(e) {
        var x = e.touches[0].clientX
        var y = e.touches[0].clientY
        updateStartPoint(x, y)
        if(isEraser) {
            ctx.clearRect(x-10, y-10, 20, 20)
        } else {
            drawArc(x, y, 2, 0, Math.PI*2)
        }
    }

    // 手指移动
    canvas.ontouchmove = function(e) {
        var x = e.touches[0].clientX
        var y = e.touches[0].clientY
        if(isEraser) {
            ctx.clearRect(x-10, y-10, 20, 20)
        } else {
            drawLine(startPoint.x, startPoint.y, x, y)
            updateStartPoint(x, y)
        }
    }
}

// 函数封装
function resetCanvas() {
    var clientWidth = document.documentElement.clientWidth
    var clientHeight = document.documentElement.clientHeight
    canvas.width = clientWidth
    canvas.height = clientHeight
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, clientWidth, clientHeight)
    ctx.fillStyle = "red"
    ctx.strokeStyle = "red"
}

function listenUser() {
    var pen = document.getElementById('pen')
    var eraser = document.getElementById('eraser')
    var clear = document.getElementById('clear')
    var download = document.getElementById('download')
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
    download.onclick = function(){
        var url = canvas.toDataURL('image/png')
        var a = document.createElement('a')
        a.href = url
        a.download = 'canvas'
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()
    }
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