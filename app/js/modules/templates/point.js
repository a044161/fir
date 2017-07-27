const point = data => { 
    const style = data.style ? data.style : {};
    
    return `<div class="fir__point__block" 
    data-point="[${data.x},${data.y}]" 
    style="width: ${style.width}; height: ${style.height}; left: ${style.left}; top: ${style.top};"></div>`
};

export default {
    point
};