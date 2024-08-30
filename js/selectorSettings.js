import groups from "./groups.js";

const selectorSettings = {
    valueField: "id",
    searchField: ["words", "id", "type"],
    options: Object.values(groups),
    maxOptions: null,
    maxItems: 10,
    optgroups: [
		// {value: "группа", label: "Группы слов"},
		// {value: "слово", label: "Отдельные слова"},
		{value: "Ошерович, 7-14 лет", label: "Ошерович, 7-14 лет"},
		{value: "Числовой тест (взрослые)", label: "Числовой тест (взрослые)"},
		{value: "Разносложные слова (взрослые)", label: "Разносложные слова (взрослые)"},
		{value: "Односложные слова (дети)", label: "Односложные слова (дети)"},
		{value: "Односложные слова (взрослые)", label: "Односложные слова (взрослые)"},
		{value: "Двусложные слова (дети, Ошерович 7-14 лет)", label: "Двусложные слова (дети, Ошерович 7-14 лет)"},
        
	],
	optgroupField: "type",
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
            (escape(data.type) === "слово" ? "" : "<span class='select-title'>" + escape(data.id) + "</span>") +
            "<span class='select-words'>" + escape(data.words.join(", ")) + "</span>" +
            "</div>"
        );
        },
        item: function (data, escape) {
        return (
            "<div title='" + escape(data.words) + "'>" + escape(data.type) + " – " + escape(data.id) + "</div>"
        );
        },
    },
};

export default selectorSettings;