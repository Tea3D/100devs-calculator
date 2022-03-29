document.querySelector('span').addEventListener('click', changeDisplayText)

function changeDisplayText() {
    let displayNum = document.querySelector('#displayNumber').innerText;

    switch (displayNum) {
        case 1:
            document.querySelector('#displayNumber').innerText = '1';
            console.log("pressed 1");
            break;
    }
}
//