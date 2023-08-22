import words from "./words.js";
import groups from "./groups.js";
import selectorSettings from "./selectorSettings.js";

const rangeNoise = document.querySelector("#range-noise");
rangeNoise.addEventListener("change", changeNoise);

function changeNoise() {
  track.noise = rangeNoise.value;
}

class Sample {
  constructor(word, file, id) {
    this.word = word;
    this.file = file;
    this.audio = new Audio(this.file);
    this.duration = null;
    this.getDuration();
    this.id = id;    
    this.block = null;
    this.current = false;
    this.played = false;
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
    this.noise = +rangeNoise.value;
  }

  addSample(sample) {
    this.samples.push(sample);
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
  track.samples[0].current = true;
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
  track.samples[track.current].play();
  track.samples[track.current].current = true;
  track.samples[track.current].block.dataset.active = 1;
  track.samples[track.current].block.dataset.current = 1;
  if (track.current < track.samples.length - 1) track.current++;
  console.log("prev", track.previous)
  console.log("curr", track.current)
  console.log("next", track.next)
}

function prevSample() {
  console.log(track.samples);
}

function nextSample() {
  if (track.current + 1 === track.samples.length) return;
  track.samples[track.current].block.dataset.current = 0;
  track.current += 1;
  track.samples[track.current].block.dataset.current = 1;
  console.log(track.current)
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