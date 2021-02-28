const colorDivs = document.querySelectorAll('.color');
const generateButton = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');
let initialColors;

sliders.forEach(slider =>
    {
        slider.addEventListener('input', hslControls);
    });

colorDivs.forEach((div, index) =>
    {
        div.addEventListener('change', () =>
        {
            updateTextUI(index);
        });
    });

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
        checkTextContrast(randomColor, hexText);

        const color = chroma(randomColor);
        const sliders = div.querySelectorAll('.sliders input');
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];

        colorizeSliders(color, hue, brightness, saturation);
    });
}

function checkTextContrast(color, text)
{
    const luminance = chroma(color).luminance();
    if(luminance > 0.5)
    {
        text.style.color = 'black';
    }
    else
    {
        text.style.color = 'white';
    }
    
}

function colorizeSliders(color, hue, brightness, saturation)
{
    const midBrightness = color.set('hsl.l', 0.5);
    const scaleBrightness = chroma.scale(['black', midBrightness, 'white']);

    const noSaturation = color.set('hsl.s', 0);
    const fullSaturation = color.set('hsl.s', 1);
    const scaleSaturation = chroma.scale([noSaturation, color, fullSaturation]);

    hue.style.backgroundImage = `linear-gradient(to right, rgb(204, 75, 75), rgb(204, 204, 75), rgb(75, 204, 75), rgb(75, 204, 204), rgb(75, 75, 204), rgb(204, 75, 204), rgb(204, 75, 75))`;
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBrightness(0)}, ${scaleBrightness(0.5)}, ${scaleBrightness(1)})`;
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSaturation(0)}, ${scaleSaturation(1)})`;
}

function hslControls(e)
{
    const index = 
    e.target.getAttribute('data-bright') || 
    e.target.getAttribute('data-sat') ||
    e.target.getAttribute('data-hue');

    let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    const bgColor = colorDivs[index].querySelector('h2').innerText;

    let color = chroma(bgColor)
    .set('hsl.s', saturation.value)
    .set('hsl.l', brightness.value)
    .set('hsl.h', hue.value);

    colorDivs[index].style.backgroundColor = color;
}

function updateTextUI(index)
{
    const activeDiv = colorDivs[index];
    const color = chroma(activeDiv.style.backgroundColor);
    const textHex = activeDiv.querySelector('h2');
    const icons = activeDiv.querySelectorAll('.controls button');
    textHex.innerText = color.hex();
    checkTextContrast(color, textHex);
    for(icon of icons)
    {
        checkTextContrast(color, icon);
    }
}



randomColors();