import groups from "./groups.js";

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

export default selectorSettings;