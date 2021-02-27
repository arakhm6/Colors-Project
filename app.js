const colorDivs = document.querySelectorAll('.color');
const generateButton = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');
let initialColors;

function generateHex()
{
    //Generating random colors with chroma js library
    const hexColor = chroma.random();
    return hexColor;
}

function randomColors()
{
    colorDivs.forEach((div, index) =>
    {
        const hexText = div.children[0];
        const randomColor = generateHex();
        //Adding color to the background
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;
    });
}

randomColors();