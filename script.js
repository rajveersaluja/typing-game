console.log("working");

//creating variables
let paragraphAPI =
  "https://api.quotable.io/quotes/random?minLength=100&maxLength=140";
let inputText = document.getElementById("inputText");
let stopBtn = document.getElementById("stop");
let startBtn = document.getElementById("start");
let para = document.getElementById("para");
let mistakes = 0;
let time = 70;
let timer = null;

//fetching paragraph
async function randomPara() {
  let response = await fetch(paragraphAPI);
  let data = await response.json();
  para.innerHTML = data[0].content;
}
//starting the test
const startTest = () => {
  clearInterval(timer);
  mistakes = 0;
  document.getElementById("totalMistakes").innerText = 0;
  time = 70;
  randomPara();
  inputText.focus();
  inputText.disabled = false;
  timer = setInterval(updateTimer, 1000);
};

//stop the Test
const stopTest = () => {
  clearInterval(timer);
  inputText.disabled = true;
  calculateMistakes();
  inputText.value = "";
};

//para complete then stop test
const testComp=()=>{
    if(inputText.value.length === para.innerText.length){
        stopTest()
    }
}


//updating the time
const updateTimer = () => {
  time--;
  document.getElementById("totalTime").innerText = time + "s";
  if (time === 0) {
    stopTest();
  }
};

//red green colour
const changingTextColor = () => {
  let typedText = inputText.value;
  let originalText = para.innerText;
  let updatedText = "";
  // Iterate over each character in the original text
  for (let i = 0; i < originalText.length; i++) {
    // Check if the character matches the typed text
    if (i < typedText.length) {
      if (typedText[i] === originalText[i]) {
        // If it matches, add the character with green color
        updatedText += `<span style="color: green;">${originalText[i]}</span>`;
      } else {
        // If it doesn't match, add the character with red color
        updatedText += `<span style="color: red;">${originalText[i]}</span>`;
      }
    } else {
      updatedText += originalText[i];
    }
  }
  // Update the paragraph with the colored text
  para.innerHTML = updatedText;
};

//calculate mistakes
const calculateMistakes = () => {
  let typedText = inputText.value;
  let originalText = para.innerText;
  let typedChar = typedText.split("");
  let originalChar = originalText.split("");
  mistakes = typedChar.reduce((acc, char, index) => {
    if (char !== originalChar[index]) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  document.getElementById("totalMistakes").innerText = mistakes;
};

//add eventlistner on btn
startBtn.addEventListener("click", startTest);
stopBtn.addEventListener("click", stopTest);
inputText.addEventListener("input", changingTextColor);
inputText.addEventListener("input", testComp);
