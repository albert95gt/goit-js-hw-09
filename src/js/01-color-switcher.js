const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

refs.stopBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener('click', setBodyColor);
refs.stopBtn.addEventListener('click', onClickStopBtn);

let intervalId;

function onClickStartBtn(){
    refs.startBtn.setAttribute('disabled', true);
    refs.stopBtn.removeAttribute('disabled');
}
    
function setBodyColor(){
    onClickStartBtn()
    
    intervalId = setInterval(function () {
        
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
}

function onClickStopBtn(){
    refs.stopBtn.setAttribute('disabled', true);
    refs.startBtn.removeAttribute('disabled');
    
    clearInterval(intervalId);

}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }


