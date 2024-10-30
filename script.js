// Selectăm canvas-ul și contextul 2D
const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

// Setări inițiale
let drawing = false;
let tool = "pencil"; // Uneltele disponibile: pencil, text, rectangle, circle
let brushSize = 5;
let brushColor = "#000000";
let startX, startY;

// Setează unealta selectată
function setTool(selectedTool) {
    tool = selectedTool;
}

// Schimbă dimensiunea pensulei
function setBrushSize(size) {
    brushSize = parseInt(size);
}

// Schimbă culoarea pensulei
function setBrushColor(color) {
    brushColor = color;
}

// Funcția de desenare cu creionul
function drawPencil(e) {
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Adaugă text la locația mouse-ului
function addText(e) {
    const text = prompt("Introduceți textul:");
    if (text) {
        ctx.font = `${brushSize * 4}px Arial`;
        ctx.fillStyle = brushColor;
        ctx.fillText(text, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }
}

// Funcția de desenare a dreptunghiului
function drawRectangle(e) {
    const width = e.clientX - canvas.offsetLeft - startX;
    const height = e.clientY - canvas.offsetTop - startY;
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
    ctx.strokeRect(startX, startY, width, height);
}

// Funcția de desenare a cercului
function drawCircle(e) {
    const radius = Math.sqrt(
        Math.pow(e.clientX - canvas.offsetLeft - startX, 2) +
        Math.pow(e.clientY - canvas.offsetTop - startY, 2)
    );
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.stroke();
}

// Gestionarea evenimentelor mouse-ului
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    startX = e.clientX - canvas.offsetLeft;
    startY = e.clientY - canvas.offsetTop;

    if (tool === "pencil") {
        drawPencil(e);
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    if (tool === "pencil") {
        drawPencil(e);
    }
});

canvas.addEventListener("mouseup", (e) => {
    drawing = false;
    ctx.beginPath(); // Închide curentul de desen pentru a evita liniile continue

    // Apelăm funcțiile corespunzătoare uneltei selectate
    if (tool === "text") {
        addText(e);
    } else if (tool === "rectangle") {
        drawRectangle(e);
    } else if (tool === "circle") {
        drawCircle(e);
    }
});

// Salvează desenul ca PNG
function saveImage() {
    const link = document.createElement("a");
    link.download = "my_drawing.png";
    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();
}