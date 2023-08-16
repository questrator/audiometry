class Sample {
    constructor() {

    }

    play() { }
}

class Track {
    constructor({ group, pause }) {
        this._pause = pause;
        this._group = group;
    }


    get pause() {
        return this._pause;
    }

    set pause(duration) {
        this._pause = duration;
    }
}

const samples = {
    0: "./sounds/soul-sirkus-periled-divide.mp3",
    мороз: "./sounds/мороз.mp3",
    ковёр: "./sounds/ковёр.mp3",
    муха: "./sounds/муха.mp3",
    печка: "./sounds/печка.mp3",
    зима: "./sounds/зима.mp3",
    халат: "./sounds/халат.mp3",
    башня: "./sounds/башня.mp3",
};

const groups = {
    G1: {
        id: "G1",
        title: "Группа G1",
        type: "Ошерович, 7-14 лет",
        words: ["мороз", "ковёр", "муха", "печка", "зима", "халат", "башня"],
    },
    G2: {
        id: "G2",
        title: "Группа G2",
        type: "Ошерович, 7-14 лет",
        words: ["север", "малыш", "роза", "запах", "яма", "рука", "пальто", "ветка", "бычок", "ласка"],
    },
    G3: {
        id: "G3",
        title: "Группа G3",
        type: "Ошерович, 7-14 лет",
        words: ["мусор", "комар", "пчела", "баба", "ванна"],
    },
}

const settingsGroups = {
    valueField: "id",
    searchField: ["words", "title", "type"],
    options: [groups.G1, groups.G2, groups.G3],
    render: {
        option: function (data, escape) {
            return "<div>" +
                "<span class='select-title'>" + escape(data.title) + "</span>" +
                "<span class='select-type'>" + escape(data.type) + "</span>" +
                "<span class='select-words'>" + escape(data.words.join(", ")) + "</span>" +
                "</div>";
        },
        item: function (data, escape) {
            return "<div title='" + escape(data.words) + "'>" + escape(data.title) + "</div>";
        }
    }
};
const tomSelectGroup = new TomSelect("#select-track", settingsGroups);

const selectGroup = document.querySelector("#select-track");
selectGroup.addEventListener("change", setGroup);

const trackBlock = document.querySelector("#track");
trackBlock.innerHTML = "<div class='track-placeholder'>группа слов ещё не выбрана</div>";

function setGroup(event) {
    console.log(selectGroup.value);
    if (selectGroup.value === "") {
        trackBlock.innerHTML = "<div class='track-placeholder'>группа слов ещё не выбрана</div>";
        return;
    }
    trackBlock.innerHTML = "";
    const words = groups[selectGroup.value].words;
    for (let i = 0; i < words.length; i++) {
        const sampleBlock = document.createElement("div");
        sampleBlock.classList.add("sample-block");
        sampleBlock.textContent = words[i];
        const sampleClose = document.createElement("div");
        sampleClose.classList.add("sample-close");
        sampleBlock.appendChild(sampleClose);
        trackBlock.appendChild(sampleBlock);
    }
}




const sampleTest = document.querySelector(".sample-test");
const sampleTestLength = sampleTest.offsetWidth;
const buttonPlay = document.querySelector(".button-play");
buttonPlay.addEventListener("click", playSample);

function playSample(event) {
    const audio = new Audio(samples["башня"]);
    let duration = 0;
    audio.addEventListener("loadedmetadata", () => {
        duration = audio.duration;
        console.log(duration);
    });
    // audio.addEventListener("timeupdate", () => {
    //     sampleTest.style.backgroundImage = `linear-gradient(90deg, rgba(50,167,228,1) ${audio.currentTime / duration * 100}%, rgba(27,146,208,1) ${audio.currentTime / duration * 100}%)`;
    // });

    requestAnimationFrame(() => { }, sampleTest);

    audio.play();





    var start = null;
    var element = sampleTest;

    function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        element.style.backgroundImage =
        `linear-gradient(90deg, rgba(50, 167, 228, 1) ${audio.currentTime / duration * 100}%, rgba(91, 188, 106, 1) ${audio.currentTime / duration * 100}%)`;
        if (progress < 2000) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}


