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
    words: ["мороз", "ковёр", "муха", "печка", "зима", "халат", "башня", "лампа", "река", "сахар"],
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
};

const selectorSettings = {
  valueField: "id",
  searchField: ["words", "title", "type"],
  options: [groups.G1, groups.G2, groups.G3],
  maxItems: 10,
  render: {
    option: function (data, escape) {
      return (
        "<div>" +
          "<span class='select-title'>" + escape(data.title) + "</span>" +
          "<span class='select-type'>" + escape(data.type) + "</span>" +
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
  constructor(word, file) {
    this.word = word;
    this.file = file;
    this.audio = new Audio(this.file);
    this.duration = null;
    this.getDuration();
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
  constructor(samples = [], pause = 500) {
    this.pause = pause;
    this.samples = samples;
    this.createSampleList();
    this.selector = new TomSelect("#select-track", selectorSettings);
    this.selector.on("change", this.getGroupList);
  }

  selectorOnChange() {
    
  }

  addSample(sample) {
    this.samples.push(sample);
  }

  getGroupList() {
    console.log(this.selector);
  }

  createSampleList() {    
    
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

const track = new Track();
console.log(track.getGroupList());
