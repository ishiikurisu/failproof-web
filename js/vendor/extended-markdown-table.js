class ExtendedMarkdownTable {
    constructor() {

    }

    parseLine(line) {
        var fields = line.trim()
                         .replace(/^\||\|$/g, "")
                         .split("|");
        var outlet = [];

        for (var i = 0; i < fields.length; i++) {
            outlet.push(fields[i].trim());
        }

        return outlet;
    }

    parseHeaders(md) {
        return this.parseLine(md.split("\n")[0]);
    }

    parseTable(md, headers) {
        var lines = md.split("\n");
        var outlet = [];

        for (var i = 2; i < lines.length; i++) {
            var line = lines[i].trim();
            if (line.length > 0 && line[0] !== ":") {
                var row = {};
                var fields = this.parseLine(line);

                for (var j = 0; j < fields.length; j++) {
                    row[headers[j]] = fields[j];
                }

                outlet.push(row);
            }
        }

        return outlet;
    }

    parseFunctions(md) {
        const lines = md.split("\n");
        var outlet = {};

        for (var i = 2; i < lines.length; i++) {
            var line = lines[i].trim();
            if (line.length > 0 && line[0] === ":") {
                var matches = /:(?<fname>.+?)=(?<fop>.+)/g.exec(line);
                outlet[matches[1].trim()] = eval(matches[2].trim());
            }
        }

        return outlet;
    }

    extend(md) {
        var headers = this.parseHeaders(md);
        var table = this.parseTable(md, headers);
        var operations = this.parseFunctions(md);
        var outlet = [];

        for (var i = 0; i < table.length; i++) {
            var row = table[i];
            for (var field in operations) {
                var operation = operations[field];
                row[field] = operation(table, row, i);
            }
            outlet.push(row);
        }

        return outlet;
    }
}
