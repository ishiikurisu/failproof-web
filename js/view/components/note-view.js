/**
 * Turns markdown into HTML
 * @param inlet raw markdown
 * @returns rendered HTML
 */
function renderMarkdown(inlet) {
    var md = new remarkable.Remarkable();
    var html = md.render(inlet);

    // rendering checkboxes
    var outlet = html.replace(/\[ \] /g, "<input type=\"checkbox\" disabled=\"true\"></input>")
                     .replace(/\[x\] /g, "<input type=\"checkbox\" disabled=\"true\" checked></input>");

    return outlet;
}

/**
 * Turns an extended markdown table into HTML
 * @param inlet raw markdown
 * @returns rendered HTML
 */
function renderTable(inlet) {
    var xmdt = new ExtendedMarkdownTable();
    return pipe(inlet, [
        x => x.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&'),
        x => xmdt.extend(x),
        x => xmdt.toMarkdown(x),
        renderMarkdown
    ]);
}

/**
 * This is the main function of this module. It returns a function to render
 * an input based on the desired visualization method
 * @param kind the desired visualization kind
 * @returns a function to render the input into usable HTML
 */
function getViewFunction(kind) {
    const VIEW_FUNCTIONS = {
        "table": renderTable
    }

    return VIEW_FUNCTIONS[kind] || renderMarkdown;
}
