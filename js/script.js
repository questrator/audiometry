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
		option: function(data, escape) {
			return "<div>" +
					"<span class='select-title'>" + escape(data.title) + "</span>" +
					"<span class='select-type'>" + escape(data.type) + "</span>" +
					"<span class='select-words'>" + escape(data.words.join(", ")) + "</span>" +
				"</div>";
		},
		item: function(data, escape) {
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
        trackBlock.appendChild(sampleBlock);
    }
}

class Sample {
    constructor() {

    }

    play() {}
}

class Track {
    constructor({group, pause}) {
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
