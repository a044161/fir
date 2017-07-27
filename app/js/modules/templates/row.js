const row = data => {
    const style = data.style ? data.style : {};

    return `<span class="fir__row__line" style="height: ${style.height};"></span>`
};

export default {
    row
};