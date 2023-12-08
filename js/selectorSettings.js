import groups from "./groups.js";

const selectorSettings = {
    valueField: "id",
    searchField: ["words", "title", "type"],
    options: Object.values(groups),
    maxItems: 10,
    optgroups: [
		{value: "группа", label: "Группы слов"},
		{value: "слово", label: "Отдельные слова"},
	],
	optgroupField: "group",
    plugins: ['caret_position','input_autogrow', 'drag_drop', 'remove_button'],
    hidePlaceholder: true,
    render: {
        optgroup_header: function(data, escape) {
			return "<div class='select-optgroup'>" + escape(data.label) + "</div>";
		},
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