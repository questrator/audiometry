import words from "./words.js";
import groups from "./groups.js";
import selectorSettings from "./selectorSettings.js";

class Sample {
  constructor(word, file, id) {
    this.word = word;
    this.file = file;
    this.audio = new Audio(this.file);
    this.duration = null;
    this.getDuration();
    this.id = id;    
    this.block = null;
    this.result = null;
  }

  getDuration() {
    this.audio.addEventListener("loadedmetadata", () => {
      this.duration = this.audio.duration;
    });
  }

  play() {
    this.audio.play();
  }
}

class Track {
  constructor(selector, pause = 4000) {
    this.selector = new TomSelect(selector, selectorSettings);
    this.samples = [];
    this.pause = pause;
    this.current = 0;

    this.noiseRange = document.querySelector("#range-noise");
    this.noiseRange.addEventListener("change", this.changeNoise.bind(this));
    this.noiseLevel = 0;
    this.noiseLabel = document.querySelector(".player-noise-label");
    this.noiseLevels = ["нет шума", "шум 3 dB", "шум 6 dB"];

    this.buttonPlay = document.querySelector(".button-play");
    this.buttonPlay.addEventListener("click", this.playSample.bind(this));
    this.buttonPrev = document.querySelector(".button-prev");
    this.buttonPrev.addEventListener("click", this.prevSample.bind(this));
    this.buttonNext = document.querySelector(".button-next");
    this.buttonNext.addEventListener("click", this.nextSample.bind(this));

    this.trackBlock = document.querySelector("#track");
    this.controls = document.querySelector("#controls");

    this.results = [];
    this.result = 0;
    this.resultBad = document.querySelector(".result-bad");
    this.resultBad.addEventListener("click", this.resultToggle.bind(this));
    this.resultGood = document.querySelector(".result-good");
    this.resultGood.addEventListener("click", this.resultToggle.bind(this));
    this.resultScoreBlock = document.querySelector(".result-score");
    this.resultWordsBlock = document.querySelector(".result-words");

    this.noise0 = new Audio("./sounds/noise0.mp3");
    this.noise1 = new Audio("./sounds/noise1.mp3");
    this.noise2 = new Audio("./sounds/noise2.mp3");
    this.noises = [this.noise0, this.noise1, this.noise2];
  }

  resultToggle(event) {
    const value = event.target.dataset.value;    
    this.setResult(value === "good" ? 1 : 0);
    const label = this.samples[this.current].block.querySelector(".sample-block-label");
    label.dataset.result = value;
    // console.log(this.samples[this.current].block)
    event.target.dataset.selected = 1;
    this[value === "good" ? "resultBad" : "resultGood"].dataset.selected = 0;
    this.samples[this.current].block.dataset.result = value;
    this.getWordsResult();
    this.moveCurrent();
    console.log(this.results);
  }

  setResult(result) {
    this.results[this.current] = result;
    this.result = Math.round(this.results.reduce((r, e) => r + e, 0) / this.results.length * 100);
    this.resultScoreBlock.textContent = `Результат: ${this.result} %`;
    return this.result;
  }

  setResultLabel(result) {
    
  }

  moveCurrent() {
    this.samples[this.current].block.dataset.active = 0;
    this.samples[this.current].block.dataset.current = 0;
    this.samples[this.current].block.dataset.played = 1;
    if (this.current < this.samples.length - 1) {
      this.current++;
    }
    this.samples[this.current].block.dataset.current = 1;
    track.resultBad.dataset.selected = 0;
    track.resultGood.dataset.selected = 0;
  }

  getWordsResult() {
    const totalWords = this.samples.length;
    const playedWords = this.samples.reduce((r, e) => e.block.dataset.result != "0" ? r + 1 : r, 0);
    this.resultWordsBlock.textContent = `Оценено слов: ${playedWords} из ${totalWords}`;
  }

  changeNoise() {
    this.noiseLevel = +(this.noiseRange.value);
    this.noiseLabel.textContent = this.noiseLevels[this.noiseRange.value];
  }

  playSample() {
    const audio = this.trackBlock.querySelector(`audio[data-id='${this.current}']`);
    const noise = document.querySelector(`audio[data-noise="${this.noiseLevel}"]`);

    if (this.samples.length === 0) return; 
    this.samples[this.current].audio.addEventListener("play", () => {
      this.samples[this.current].block.dataset.played = 0;
    });
    audio.addEventListener("ended", this.endedHandler.bind(this));

    noise.play();
    setTimeout(function() {
      audio.play();
    }, 200);    

    setTimeout(function() {
      // const clone = audio.cloneNode(true);
      // audio.replaceWith(clone);
      noise.pause();
      noise.currentTime = 0;
    }, this.samples[this.current].duration * 1000 + 500);

    this.samples[this.current].block.dataset.active = 1;
  }

  endedHandler() {
    // this.samples[this.current].block.dataset.active = 0;
    // this.samples[this.current].block.dataset.current = 0;
    // this.samples[this.current].block.dataset.played = 1;
    // if (this.current < this.samples.length - 1) {
    //   this.current++;
    // }
    // this.samples[this.current].block.dataset.current = 1;
  }

  prevSample() {
    if (this.current === 0) return;
    this.samples[this.current].block.dataset.current = 0;
    this.current--;
    this.samples[this.current].block.dataset.current = 1;
  }
  
  nextSample() {
    if (this.current + 1 === this.samples.length) return;
    this.samples[this.current].block.dataset.current = 0;
    this.current++;
    this.samples[this.current].block.dataset.current = 1;
  }
}

const track = new Track("#select-track");
track.selector.on("change", createSampleList);

function createSampleList(event) {
  track.resultScoreBlock.textContent = "";
  track.resultWordsBlock.textContent = "";
  track.trackBlock.innerHTML = "";  
  track.samples.length = 0;
  track.results.length = 0;
  const groupList = track.selector.getValue();
  const wordList = groupList.map(e => groups[e].words).flat(1);
  track.samples.push(...wordList.map((e, i) => new Sample(e, words[e], i)));

  if (track.samples.length > 0) {
    track.controls.style.display = "flex";
  }
  else track.controls.style.display = "none";


  for (let i = 0; i < track.samples.length; i++) {
    const sampleBlock = document.createElement("div");
    sampleBlock.dataset.id = i;
    sampleBlock.dataset.played = 0;
    sampleBlock.dataset.active = 0;
    sampleBlock.dataset.current = 0;
    sampleBlock.dataset.result = 0;
    sampleBlock.textContent = track.samples[i].word;
    sampleBlock.classList.add("sample-block");    
    track.trackBlock.insertAdjacentElement("beforeend", sampleBlock);
    track.samples[i].block = sampleBlock;

    const audioBlock = track.samples[i].audio;
    audioBlock.dataset.id = i;
    track.trackBlock.insertAdjacentElement("beforeend", audioBlock);

    const sampleBlockLabel = document.createElement("div");
    sampleBlockLabel.classList.add("sample-block-label");
    sampleBlock.insertAdjacentElement("beforeend", sampleBlockLabel);
  }

  if (track.samples.length > 0) track.samples[0].block.dataset.current = 1;
  track.current = 0;

  for (let i = 0; i < track.noises.length; i++) {
    const noiseBlock = track.noises[i];
    noiseBlock.dataset.noise = i;
    track.trackBlock.insertAdjacentElement("beforeend", noiseBlock);
  }
}




  // const sampleTest = document.querySelector(".sample-test");
  // const sampleTestLength = sampleTest.offsetWidth;
  // const buttonPlay = document.querySelector(".button-play");
  // buttonPlay.addEventListener("click", playSample);
  
  // function playSample(event) {
  //     const audio = new Audio(words["башня"]);
  //     let duration = 0;
  //     audio.addEventListener("loadedmetadata", () => {
  //         duration = audio.duration;
  //         console.log(duration);
  //     });
  //     audio.play();
  
  //     var start = null;
  //     var element = sampleTest;
  
  //     function step(timestamp) {
  //         if (!start) start = timestamp;
  //         var progress = timestamp - start;
  //         element.style.backgroundImage =
  //         `linear-gradient(90deg, rgba(79, 163, 241, 1) ${audio.currentTime / duration * 100}%, rgba(253, 199, 78, 1) ${audio.currentTime / duration * 100}%)`;
  //         if (progress < 2000) {
  //             window.requestAnimationFrame(step);
  //         }
  //     }
  
  //     window.requestAnimationFrame(step);
  // }