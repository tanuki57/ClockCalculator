/**　情報の取得　*/

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

const ac = document.getElementById('AC');
const equal = document.getElementById('equal');
const koron = document.getElementById('aida');
const backspace = document.getElementById('backspace');

const display = document.getElementById('display');
const result = document.getElementById('result');
const mresult = document.getElementById('mresult');

const history = document.getElementById('history');

let histories = [];

numbers.forEach(function(button) {
    button.addEventListener('click',function() {
        display.value += button.textContent;
    });
});

operators.forEach(function(button) {
    button.addEventListener('click',function() {
        display.value += button.textContent;
    });
});

koron.addEventListener('click',function() {
    display.value += ':';
});

ac.addEventListener('click',function() {
    display.value = '';
    result.value = '';
    mresult.value = '';
});

backspace.addEventListener('click',function() {
    display.value = display.value.slice(0,-1);
});

equal.addEventListener('click',function() {

    const expression = display.value;

    if (expression.includes('+')) {

        const parts = expression.split('+');

        const leftTime = parts[0];
        const rightTime = parts[1];

        const leftParts = leftTime.split(':');
        const rightParts = rightTime.split(':');

        const leftHour = Number(leftParts[0]);
        const leftMinute = Number(leftParts[1]);
        const rightHour = Number(rightParts[0]);
        const rightMinute = Number(rightParts[1]);

        const leftTotalMinute = 60 * leftHour + leftMinute;
        const rightTotalMinute = 60 * rightHour + rightMinute;

        const totalMinute = leftTotalMinute + rightTotalMinute;

        const hour = Math.floor(totalMinute / 60);
        const minute = totalMinute % 60;

        let displayMinute = minute;

        if(minute < 10) {
            displayMinute = '0' + minute;
        }
        result.value = hour + ':' + displayMinute;
        mresult.value = totalMinute;
        histories.unshift(
            expression + '=' + hour + ':' + displayMinute
        );
        history.innerHTML = histories.join('<br>');
    } else if (expression.includes('-')) {

        const parts = expression.split('-');

        const leftTime = parts[0];
        const rightTime = parts[1];

        const leftParts = leftTime.split(':');
        const rightParts = rightTime.split(':');

        const leftHour = Number(leftParts[0]);
        const leftMinute = Number(leftParts[1]);
        const rightHour = Number(rightParts[0]);
        const rightMinute = Number(rightParts[1]);

        const leftTotalMinute = 60 * leftHour + leftMinute;
        const rightTotalMinute = 60 * rightHour + rightMinute;

        const totalMinute = leftTotalMinute - rightTotalMinute;

        const hour = Math.floor(totalMinute / 60);
        const minute = totalMinute % 60;

        let displayMinute = minute;

        if(minute < 10) {
            displayMinute = '0' + minute;
        }
        result.value = hour + ':' + displayMinute;
        mresult.value = totalMinute;
        histories.unshift(
            expression + '=' + hour + ':' + displayMinute
        );
        history.innerHTML = histories.join('<br>');
    };
});

