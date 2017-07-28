const col = data => {
    const style = data.style ? data.style : {};

    return `<span class="fir__col__line" style="width: ${style.width};"></span>`
};

export default {
    col
};