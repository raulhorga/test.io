const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

// Setări inițiale
let drawing = false;
let brushSize = 5;
let brushColor = "#000000";

// Setează dimensiunea pensulei
function setBrushSize(size) {
    brushSize = parseInt(size);
}

// Setează culoarea pensulei
function setBrushColor(color) {
    brushColor = color;
}

// Începe desenarea
canvas.addEventListener("mousedown", () => {
    drawing = true;
    ctx.beginPath();
});

// Oprește desenarea
canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath(); // Închide curentul pentru a evita legarea liniilor
});

// Desenează linia în timp ce miști mouse-ul
canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;
    
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
});

// Salvează imaginea ca PNG
function saveImage() {
    const link = document.createElement("a");
    link.download = "my_drawing.png";
    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();
}