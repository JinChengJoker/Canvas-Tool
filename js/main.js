var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var mouseDown = false
var startPoint = {
    x: undefined,
    y: undefined
}
var endPoint = {
    x: undefined,
    y: undefined
}

var clientWidth = document.documentElement.clientWidth
var clientHeight = document.documentElement.clientHeight
canvas.width = clientWidth
canvas.height = clientHeight

window.onresize = function() {
    var clientWidth = document.documentElement.clientWidth
    var clientHeight = document.documentElement.clientHeight
    canvas.width = clientWidth
    canvas.height = clientHeight
}

// 鼠标按下
canvas.onmousedown = function(e) {
    mouseDown = true
    var x = e.clientX
    var y = e.clientY
    startPoint.x = x
    startPoint.y = y
    ctx.fillStyle = "red"
    ctx.fillRect(x-3, y-3, 6, 6)
}

// 鼠标移动
canvas.onmousemove = function(e) {
    if(mouseDown) {
        var x = e.clientX
        var y = e.clientY
        ctx.lineWidth = 5
        ctx.strokeStyle = "red"
        ctx.beginPath()
        ctx.moveTo(startPoint.x, startPoint.y)
        ctx.lineTo(x, y)
        ctx.closePath()
        ctx.stroke()
        startPoint.x = x
        startPoint.y = y
    }
}

// 鼠标松开
canvas.onmouseup = function(e) {
    mouseDown = false
}