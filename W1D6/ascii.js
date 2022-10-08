window.onload = function () {
  "use strict";
  const textArea = document.getElementById("text-area");
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const animationSelect = document.getElementById("animation");
  const fontSizeSelect = document.getElementById("fontsize");
  const speedCheck = document.getElementById("turbo");
  const SIZE = {
    "Tiny": "7pt",
    "Small": "10pt",
    "Medium": "12pt",
    "Large": "16pt",
    "Extra Large": "24pt",
    "XXL": "32pt"
  };
  let currentInterval;
  let frameId;
  let animation;


  function getFrames(str) {
    return str.split("=====\n");
  }

  function getCurrentAnimation() {
    return animationSelect.value;
  }

  function getFontSize() {
    return fontSizeSelect.value;
  }

  function checkTurboSpeed() {
    return speedCheck.checked;
  }

  function getSpeed() {
    return checkTurboSpeed() ? 50 : 250;
  }

  function setFrame(frame) {
    textArea.value = frame;
  }

  function switchButtonState() {
    startBtn.disabled = !startBtn.disabled;
    stopBtn.disabled = !stopBtn.disabled;
  }

  function computeCounter() {
    if (frameId === animation.length - 1) {
      frameId = 0;
    } else {
      frameId++;
    }
  }

  function runAnimation() {
    if (stopBtn.disabled) return;
    stopAnimation();
    textArea.style.fontSize = SIZE[getFontSize()];
    animation = getFrames(ANIMATIONS[getCurrentAnimation()]);
    getFontSize();
    currentInterval = setInterval(function () {
      setFrame(animation[frameId]);
      computeCounter();
    }, getSpeed());
  }

  function startAnimation() {
    frameId = 0;
    runAnimation();
  }

  function stopAnimation() {
    clearInterval(currentInterval);
  }

  startBtn.addEventListener("click", function () {
    switchButtonState();
    startAnimation();
  });
  stopBtn.addEventListener("click", function () {
    switchButtonState();
    stopAnimation();
  });
  speedCheck.addEventListener("click", runAnimation);
  animationSelect.addEventListener("change", startAnimation);
  fontSizeSelect.addEventListener("change", runAnimation);
};

