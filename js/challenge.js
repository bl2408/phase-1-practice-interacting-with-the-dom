const elCounter = document.querySelector("#counter");
const form = document.querySelector("#comment-form");
const numLikes = {};
const buttonList = {
    minus: document.querySelector("#minus"),
    plus: document.querySelector("#plus"),
    heart: document.querySelector("#heart"),
    reset: document.querySelector("#reset"),
    submit: document.querySelector("#submit"),
};

let counter = 0;
let paused = false;

setInterval(()=>{
    if(paused){ return; }
    counter++;
    updateDisplay();
}, 1000);

//updates the element display
function updateDisplay(){
    elCounter.textContent = counter;
}

//minus btn
buttonList.minus.addEventListener("click", e=>{
    counter--;
    if(counter < 0){ counter = 0; }
    updateDisplay();
});

//plus btn
buttonList.plus.addEventListener("click", e=>{
    counter++;
    updateDisplay();
});

//heart btn
buttonList.heart.addEventListener("click", e=>{
    const captureCounter = counter;
    const elLikes = document.querySelector(".likes");

    if(!numLikes[captureCounter]){ numLikes[captureCounter] = 0; }
    numLikes[captureCounter]++;

    elLikes.innerHTML = "";
    
    for(const likes in numLikes){
        const times = numLikes[likes] === 1 ? "time!" : "times!"
        elLikes.innerHTML += `
            <li>${likes} has been liked ${numLikes[likes]} ${times}</li>
        `;
    }
});

//pause btn
document.querySelector("#pause").addEventListener("click", e=>{
    paused = !paused;
    e.target.textContent = paused ? "resume" : "pause";
    for(const button in buttonList){
        buttonList[button].disabled = paused;
    }
    updateDisplay()
});

//reset btn
buttonList.reset.addEventListener("click", e=>{
    counter = 0;
    updateDisplay();
});

//submit
form.addEventListener("submit", e=>{
    e.preventDefault()

    const input = e.target["comment-input"];
    if(!input.value){ return; }
    
    document.querySelector("#list").innerHTML += `
    <div>${input.value}</div>
    `;
    
    form.reset();
});