// Selectăm canvas-ul și setăm contextul 2D
const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

// Setări pentru desen
let drawing = false;
let brushSize = 5;  // Dimensiune inițială a pensulei
let brushColor = "#000000";

// Funcția pentru a începe desenul
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    draw(e);
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();  // Închide curentul desen pentru a preveni legarea dintre linii
});

canvas.addEventListener("mousemove", draw);

// Funcția de desenare
function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;

    // Setăm poziția pe canvas și desenăm
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Schimbă dimensiunea pensulei
function setBrushSize(size) {
    brushSize = size;
}

// Salvează desenul ca PNG
function saveImage() {
    const link = document.createElement("a");
    link.download = "my_drawing.png";
    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();
}