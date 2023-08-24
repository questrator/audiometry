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
    this.result = 1;
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
  constructor(selector, samples = [], pause = 1000) {
    this.selector = new TomSelect(selector, selectorSettings);
    this.samples = samples;
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
  }

  changeNoise() {
    this.noiseLevel = +(this.noiseRange.value);
    this.noiseLabel.textContent = this.noiseLevels[this.noiseRange.value];
  }

  playSample() {
    const audio = trackBlock.querySelector(`audio[data-id='${this.current}']`);

    if (this.samples.length === 0) return; 
    this.samples[this.current].audio.addEventListener("play", () => {
      this.samples[this.current].block.dataset.played = 0;
    });
    audio.addEventListener("ended", this.endedHandler.bind(this));

    audio.play();
    setTimeout(function() {
      const clone = audio.cloneNode(true);
      audio.replaceWith(clone);
    }, this.samples[this.current].duration * 1000 + 500);

    this.samples[this.current].block.dataset.active = 1;  
  }

  endedHandler() {
    this.samples[this.current].block.dataset.active = 0;
    this.samples[this.current].block.dataset.current = 0;
    this.samples[this.current].block.dataset.played = 1;
    if (this.current < this.samples.length - 1) {
      this.current++;
    }
    this.samples[this.current].block.dataset.current = 1;
  }

  prevSample() {
    if (this.current === 0) return;
    this.samples[this.current].block.dataset.current = 0;
    this.current--;
    this.samples[this.current].block.dataset.current = 1;
    console.log(this.current)
  }
  
  nextSample() {
    if (this.current + 1 === this.samples.length) return;
    this.samples[this.current].block.dataset.current = 0;
    this.current++;
    this.samples[this.current].block.dataset.current = 1;
    console.log(this.current)
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

    const audioBlock = track.samples[i].audio;
    audioBlock.dataset.id = i;
    trackBlock.insertAdjacentElement("beforeend", audioBlock);
  }

  track.samples[0].block.dataset.current = 1;
  track.current = 0;
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