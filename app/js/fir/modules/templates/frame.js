const fir_wrapper = data => {
    return `
    <div class="fir">
        <div class="fir__header">
            <p class="fir__header__p">当前为：黑方</>
        </div>
        <div class="fir__body">
            ${data}
        </div>
        <div class="fir__side">
            <button class="fir__button" id="backMoveBtn">悔棋</button>
            <button class="fir__button" id="resetBtn">重新开始</button>
        </div>
    </div>`
};

const fir_col = data => {
    return `<div class="fir__col">${data}</div>`
};

const fir_row = data => {
    return `<div class="fir__row">${data}</div>`
};

const fir_point = data => {
    return `<div class="fir__point">${data}</div>`
};

export default {
    fir_wrapper,
    fir_col,
    fir_row,
    fir_point
};