function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector("[data-start]");
const buttonStop = document.querySelector("[data-stop]");
const body = document.querySelector('body');

buttonStop.style.opacity = "50%";

buttonStart.addEventListener("click", buttonStartOnClick, {once: true});

function buttonStartOnClick(){
    // console.log("Ready");
    buttonStop.style.opacity = "100%";
    buttonStart.style.opacity = "50%";
    body.style.backgroundColor = `${getRandomHexColor()}`;
    const process = setInterval(() => {
        body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
    const bindObject = {
        process
    }
    buttonStop.addEventListener("click", buttonStopOnClick.bind(bindObject), {once: true});
}

function buttonStopOnClick(){
    // console.log("Ready");
    buttonStart.style.opacity = "100%";
    buttonStop.style.opacity = "50%";
    
    clearInterval(this.process);

    buttonStart.addEventListener("click", buttonStartOnClick, {once: true});
}