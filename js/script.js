import words from "./words.js";
import groups from "./groups.js";
import selectorSettings from "./selectorSettings.js";

// const rangeNoise = document.querySelector("#range-noise");
// rangeNoise.addEventListener("change", changeNoise);
// const rangeNoiseLabel = document.querySelector(".player-noise-label");

// function changeNoise() {
//   const noise = ["нет шума", "шум 3 dB", "шум 6 dB"];
//   track.noise = +rangeNoise.value;
//   rangeNoiseLabel.textContent = noise[rangeNoise.value];
//   console.log(track)
// }

class Sample {
  constructor(word, file, id) {
    this.word = word;
    this.file = file;
    this.audio = new Audio(this.file);
    this.duration = null;
    this.getDuration();
    this.id = id;    
    this.block = null;
  }

  getDuration() {
    this.audio.addEventListener("loadedmetadata", () => {
      this.duration = this.audio.duration;
    });
  }

  play() {
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}

class Track {
  constructor(selector, samples = [], pause = 1000) {
    this.selector = new TomSelect(selector, selectorSettings);
    this.samples = samples;
    this.pause = pause;
    this.current = 0;
    this.previous = 0;
    this.next = 1;
    this.noiseRange = document.querySelector("#range-noise");
    this.noiseRange.addEventListener("change", this.changeNoise.bind(this));
    this.noiseLevel = 0;
    this.noiseLabel = document.querySelector(".player-noise-label");
    this.noiseLevels = ["нет шума", "шум 3 dB", "шум 6 dB"];
  }

  addSample(sample) {
    this.samples.push(sample);
  }

  changeNoise() {
    this.noiseLevel = +(this.noiseRange.value);
    this.noiseLabel.textContent = this.noiseLevels[this.noiseRange.value];
  }
}

const track = new Track("#select-track");
track.selector.on("change", createSampleList);
const trackBlock = document.querySelector("#track");

function createSampleList(event) {
  trackBlock.innerHTML = "";  
  track.samples.length = 0;
  const groupList = track.selector.getValue();
  const wordList = groupList.map(e => groups[e].words).flat(1);
  track.samples.push(...wordList.map((e, i) => new Sample(e, words[e], i)));

  for (let i = 0; i < track.samples.length; i++) {
    const sampleBlock = document.createElement("div");
    sampleBlock.dataset.played = 0;
    sampleBlock.dataset.active = 0;
    sampleBlock.dataset.current = 0;
    sampleBlock.dataset.id = i;
    sampleBlock.textContent = track.samples[i].word;
    sampleBlock.classList.add("sample-block");    
    trackBlock.insertAdjacentElement("beforeend", sampleBlock);
    track.samples[i].block = sampleBlock;
  }
  track.samples[0].block.dataset.current = 1;
  track.current = 0;
}

const buttonPlay = document.querySelector(".button-play");
buttonPlay.addEventListener("click", playSample);
const buttonPrev = document.querySelector(".button-prev");
buttonPrev.addEventListener("click", prevSample);
const buttonNext = document.querySelector(".button-next");
buttonNext.addEventListener("click", nextSample);

function playSample() {
  if (track.samples.length === 0) return; 
  track.samples[track.current].audio.addEventListener("ended", () => {
    track.samples[track.current].block.dataset.active = 0;
    track.samples[track.current].block.dataset.current = 0;
    track.samples[track.current].block.dataset.played = 1;
    if (track.current < track.samples.length - 1) track.current++;
    track.samples[track.current].block.dataset.current = 1;
  });
  track.samples[track.current].play();
  track.samples[track.current].block.dataset.active = 1;  
  console.log("track", track);
}

function prevSample() {
  if (track.current === 0) return;
  track.samples[track.current].block.dataset.current = 0;
  track.current--;
  track.next--;
  track.previous--;
  track.samples[track.current].block.dataset.current = 1;
}

function nextSample() {
  if (track.current + 1 === track.samples.length) return;
  track.samples[track.current].block.dataset.current = 0;
  track.current++;
  track.next++;
  track.previous++;
  track.samples[track.current].block.dataset.current = 1;
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