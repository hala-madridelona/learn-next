const PLACEHOLDER_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Box Click Color Change</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="box-container">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
`;

const  PLACEHOLDER_JS = `
document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");

    function changeColors() {
        const colors = ["red", "green", "blue", "purple", "orange"];
        const newColor = colors[Math.floor(Math.random() * colors.length)];

        boxes.forEach(box => {
            box.style.backgroundColor = newColor;
        });
    }

    boxes.forEach(box => {
        box.addEventListener("click", changeColors);
    });
});
`;

const PLACEHOLDER_CSS = `
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
    margin: 0;
}

.box-container {
    display: flex;
    gap: 20px;
}

.box {
    width: 200px;
    height: 200px;
    background-color: steelblue;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

`;


export { PLACEHOLDER_HTML, PLACEHOLDER_JS, PLACEHOLDER_CSS };