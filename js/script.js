const words = {
  мороз: "./sounds/мороз.mp3",
  ковёр: "./sounds/ковёр.mp3",
  муха: "./sounds/муха.mp3",
  печка: "./sounds/печка.mp3",
  зима: "./sounds/зима.mp3",
  халат: "./sounds/халат.mp3",
  башня: "./sounds/башня.mp3",
  лампа: "./sounds/лампа.mp3",
  река: "./sounds/река.mp3",
  сахар: "./sounds/сахар.mp3",
};

const groups = {
  G1: {
    id: "G1",
    title: "Группа G1",
    type: "Ошерович, 7-14 лет",
    words: ["мороз", "ковёр", "муха", "печка", "зима", "халат"],
  },
  G2: {
    id: "G2",
    title: "Группа G2",
    type: "Ошерович, 7-14 лет",
    words: ["север", "малыш", "роза", "запах", "яма", "рука", "пальто"],
  },
  G3: {
    id: "G3",
    title: "Группа G3",
    type: "Ошерович, 7-14 лет",
    words: ["мусор", "комар", "пчела", "баба", "ванна"],
  },
  S1: {
    id: "S1",
    title: "мусор",
    type: "слово",
    words: ["мусор"],
  },
  S2: {
    id: "S2",
    title: "комар",
    type: "слово",
    words: ["комар"],
  },
  S3: {
    id: "S3",
    title: "мусор",
    type: "слово",
    words: ["мусор"],
  },
  S4: {
    id: "S4",
    title: "комар",
    type: "слово",
    words: ["комар"],
  },
  S5: {
    id: "S5",
    title: "мусор",
    type: "слово",
    words: ["мусор"],
  },
  S6: {
    id: "S6",
    title: "комар",
    type: "слово",
    words: ["комар"],
  },
  S7: {
    id: "S7",
    title: "мусор",
    type: "слово",
    words: ["мусор"],
  },
  S8: {
    id: "S8",
    title: "комар",
    type: "слово",
    words: ["комар"],
  },
  S9: {
    id: "S9",
    title: "мусор",
    type: "слово",
    words: ["мусор"],
  },
  S10: {
    id: "S10",
    title: "комар",
    type: "слово",
    words: ["комар"],
  },
  S11: {
    id: "S11",
    title: "мусор",
    type: "слово",
    words: ["мусор"],
  },
  S12: {
    id: "S12",
    title: "комар",
    type: "слово",
    words: ["комар"],
  },
};

const selectorSettings = {
  valueField: "id",
  searchField: ["words", "title", "type"],
  options: Object.values(groups),
  maxItems: 10,
  render: {
    option: function (data, escape) {
      return (
        "<div>" + 
          (escape(data.type) === "слово" ? "" : "<span class='select-type'>" + escape(data.type) + "</span>") +
          (escape(data.type) === "слово" ? "" : "<span class='select-title'>" + escape(data.title) + "</span>") +
          "<span class='select-words'>" + escape(data.words.join(", ")) + "</span>" +
        "</div>"
      );
    },
    item: function (data, escape) {
      return (
        "<div title='" + escape(data.words) + "'>" + escape(data.title) + "</div>"
      );
    },
  },
};


class Sample {
  constructor(word, file, id) {
    this.word = word;
    this.file = file;
    this.audio = new Audio(this.file);
    this.duration = null;
    this.getDuration();
    this.played = false;
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
    this.pause = pause;
    this.samples = samples;
    this.selector = new TomSelect(selector, selectorSettings);
  }

  addSample(sample) {
    this.samples.push(sample);
  }

  createSampleList() {    
    
  }
}

const track = new Track("#select-track");
track.selector.on("change", createSampleList);
const trackBlock = document.querySelector("#track");
const sampleList = [];

function createSampleList(event) {
  trackBlock.innerHTML = "";  
  sampleList.length = 0;
  const groupList = track.selector.getValue();
  const wordList = groupList.map(e => groups[e].words).flat(1);
  sampleList.push(...wordList.map((e, i) => new Sample(e, words[e], i)));

  for (let i = 0; i < sampleList.length; i++) {
    const sampleBlock = document.createElement("div");
    sampleBlock.dataset.played = "0";
    sampleBlock.dataset.active = "0";
    sampleBlock.dataset.id = i;
    sampleBlock.textContent = sampleList[i].word;
    sampleBlock.classList.add("sample-block");    
    trackBlock.insertAdjacentElement("beforeend", sampleBlock);
    sampleList[i].block = sampleBlock;
  }
}

const buttonPlay = document.querySelector(".button-play");
buttonPlay.addEventListener("click", playSamples);

function playSamples() {
  if (sampleList.length === 0) return;
  let delay = 0;
  for (let i = 0; i < sampleList.length; i++) {
    setTimeout(() => {
      sampleList[i].play();
      sampleList[i].block.dataset.active = 1;
      console.log(sampleList[i].word);
    }, delay);
    delay += sampleList[i].duration * 1000 + track.pause;
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