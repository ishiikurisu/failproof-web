describe('FPCL Tables', function() {
    describe('Table Convertion', function() {
        it('Should convert from Markdown to FPCL', function() {
            var md = `| Name | Age |
|---|---|
| Mira | 26 |
| Pietro | 23 |
| Flora | 16 |
`;
            var expectedBlock = {
                kind: "table",
                entries: [
                    {
                        Name: "Mira",
                        Age: "26"
                    }, {
                        Name: "Pietro",
                        Age: "23"
                    }, {
                        Name: "Flora",
                        Age: "16"
                    }
                ]
            };

            var resultBlock = tableMd2Fpcl(md);
            assertEqualFpcl([expectedBlock], [resultBlock]);
        });

        it('Should convert from FPCL to Markdown', function() {
            var block = {
                kind: "table",
                entries: [
                    {
                        Name: "Mira",
                        Age: "26"
                    }, {
                        Name: "Pietro",
                        Age: "23"
                    }, {
                        Name: "Flora",
                        Age: "16"
                    }
                ]
            };

            var expected = `| Name   | Age |
|--------|-----|
| Mira   | 26  |
| Pietro | 23  |
| Flora  | 16  |
`;
            var result = tableFpcl2Md(block.entries);
            chai.assert(expected === result, 'Generated correct Markdown');
        });
    });
});
