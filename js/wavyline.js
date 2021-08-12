var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth <= 900 ? 1500 : 1700;
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var step1 = -4;
var step2 = -4;
var step3 = -4;
var step4 = -4;

function start() {
    window.requestAnimationFrame(start);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawWave(60, "sin");
    drawWave2(30, "sin");
    drawWave3(10, "cos");
    drawWave4(50, "cos");
}



function drawWave(amplitude, trig) {
    // trig is the trigonometric function to be used: sin or cos
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ed1c24";

    var x = 0, y = 0;
    step1 += 2;

    var frequency = width / (2 * Math.PI);

    while (x < width) {
        y = height / 2 + amplitude * Math[trig]((x + step1) / frequency);
        ctx.lineTo(x, y);
        x++;
    }

    ctx.stroke();
    ctx.restore();
}

function drawWave2(amplitude, trig) {
    // trig is the trigonometric function to be used: sin or cos
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ed1c24";

    var x = 0, y = 0;
    step2 += 10;

    var frequency = width / (2 * Math.PI);

    while (x < width) {
        y = height / 2 + amplitude * Math[trig]((x + step2) / frequency);
        ctx.lineTo(x, y);
        x++;
    }

    ctx.stroke();
    ctx.restore();
}

function drawWave3(amplitude, trig) {
    // trig is the trigonometric function to be used: sin or cos
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ed1c24";

    var x = 0, y = 0;
    step3 += 10;

    var frequency = width / (2 * Math.PI);

    while (x < width) {
        y = height / 2 + amplitude * Math[trig]((x + step3) / frequency);
        ctx.lineTo(x, y);
        x++;
    }

    ctx.stroke();
    ctx.restore();
}

function drawWave4(amplitude, trig) {
    // trig is the trigonometric function to be used: sin or cos
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ed1c24";

    var x = 0, y = 0;
    step4 += 4;

    var frequency = width / (2 * Math.PI);

    while (x < width) {
        y = height / 2 + amplitude * Math[trig]((x + step4) / frequency);
        ctx.lineTo(x, y);
        x++;
    }

    ctx.stroke();
    ctx.restore();
}

start();