var stepNumber = 0;
var readyToPlay = false;
var loading = document.getElementById("loading");

function runSpeechRecognition() {
  // get output div reference
  var result = document.getElementById("result");
  // get action element reference
  // new speech recognition object
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  recognition.onstart = function () {
    loading.classList.add("isActive");
  };
  recognition.onspeechend = function () {
    loading.classList.remove("isActive");
    recognition.stop();
  };

  recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    result.innerHTML =
      "<b>Last Step:</b> " +
      transcript +
      "<br/> <b>Confidence:</b> " +
      confidence * 100 +
      "%";
    result.classList.remove("hide");
    readyToPlay = true;
    if (stepNumber === 0) {
      addtitle(transcript);
    } else {
      addStep(transcript);
    }
    
  };

  recognition.start();
}

function sayItLoud(transcript) {
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[0];
  msg.voiceURI = "native";

  msg.lang = "en-US";

  if (stepNumber === 0) {
    msg.text =
      "Hello your cooper is here to help you in creating instruction, what is the name of your instruction?";
  } else {
    msg.text = "You Said, " + transcript + ", now, what is your next step?";
  }

  msg.onend = function (e) {
    runSpeechRecognition();
  };
  speechSynthesis.speak(msg);
}

function addtitle(transcript) {
  var intsructionName = document.getElementById("instructionName");
  intsructionName.value = transcript;
  stepNumber = stepNumber + 1;
  sayItLoud(transcript);

}

function addStep(transcript) {
  allSteps = document.getElementById("allSteps");
  console.log(transcript);
  let stepRow = document.createElement("div");
  stepRow.classList.add("row");
  stepRow.classList.add("channel-row");
  let steplabel = document.createElement("label");
  Object.assign(steplabel, {
    for: "step" + String(stepNumber),
  });
  steplabel.innerHTML = "Step" + String(stepNumber);
  stepRow.appendChild(steplabel);
  let stepInput = document.createElement("input");
  Object.assign(stepInput, {
    className: "u-full-width adt-text-inpt",
    type: "text",
    placeholder: "Say Sth",
    id: "setp" + String(stepNumber),
    value: transcript,
  });
  stepRow.appendChild(stepInput);
  allSteps.appendChild(stepRow);
  stepNumber = stepNumber + 1;
  sayItLoud(transcript);
 
}
