function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var offsetX = 25;
    var offsetY = 25;
    var shape = document.getElementById(data).cloneNode(true);
    shape.style.position = "absolute";
    shape.style.left = (event.clientX - offsetX - event.target.getBoundingClientRect().left) + "px";
    shape.style.top = (event.clientY - offsetY - event.target.getBoundingClientRect().top) + "px";
    event.target.appendChild(shape);
}

function clearContainer(container) {
    var container = document.getElementById(container);
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
function getRadonTransform() {
    exportAsGrayscale()
}
function exportAsGrayscale() {
    var container = document.getElementById("container");
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Draw shapes onto the canvas
    var shapes = container.querySelectorAll('.shape');
    shapes.forEach(function (shape) {
        var rect = shape.getBoundingClientRect();
        context.fillStyle = "#000";
        context.fillRect(rect.left - container.getBoundingClientRect().left, rect.top - container.getBoundingClientRect().top, rect.width, rect.height);
    });

    // Get image data from the canvas
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    // Calculate grayscale values
    for (var i = 0; i < data.length; i += 4) {
        var brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = brightness; // Red channel
        data[i + 1] = brightness; // Green channel
        data[i + 2] = brightness; // Blue channel
    }

    // Put the grayscale data back onto the canvas
    context.putImageData(imageData, 0, 0);

    // Display the grayscale image in the radonContainer
    var radonContainer = document.getElementById("radonContainer");
    radonContainer.innerHTML = ''; // Clear previous content
    radonContainer.appendChild(canvas);
}
