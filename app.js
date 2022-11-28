const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', e =>{
    e.preventDefault();
    const key = e.code;
    if (key.toLowerCase() === 'space'){
        setRandomColors();
    }
})

document.addEventListener('click', e =>{
    const type = e.target.dataset.type;

    if (type === 'lock'){
        const node = e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    }else if(type === 'copy'){
        copyToClickborad(e.target.textContent);
    }
})

function generateRandomColor(){

    const hexCodes = "0123456789ABCDEF";
    let color = '';
    for(let i = 0; i < 6; i++){
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color;

}

function copyToClickborad(text){
    return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial){
    const colors = isInitial ? getColorsFromHash() : [];


    cols.forEach((col, index) =>{

        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');

        if (isLocked){
            colors.push(text.textContent)
            return
        }

        const color = isInitial
            ? colors[index]
                ? colors[index]
                : generateRandomColor()
            : generateRandomColor();
        if (!isInitial){
            colors.push(color);
        }

        text.innerHTML = color;
        col.style.background = color;

        setTextColor(text, color);
        setTextColor(button, color);
    })
    updateColorsHash(colors);
}

function setTextColor(text, color){
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []){
    console.log('colors', colors);
    document.location.hash = colors
        .map((col) => {
            console.log('col', col);
            return col.toString().substring(1)
        })
        .join("-");
}

function getColorsFromHash(){
    if (document.location.hash.length > 1){
        return document.location.hash
            .substring(1)
            .split("-")
            .map((color) => '#' + color)
    }
    return []
}

setRandomColors(true);


const map = new Map();
map.set('x', 88);
map.set('y', 99);
console.log(map);

const map2 = new Map([['x', 88], ['y', 99]])
console.log(map2);


