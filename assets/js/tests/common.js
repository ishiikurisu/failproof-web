/* ######################
   # AUXILIAR FUNCTIONS #
   ###################### */
function assertEqualFpcl(expected, result) {
    let listsHaveSameLength = function(a, b) {
        return a.length === b.length;
    }

    let listsHaveContent = function(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    let conclusion = listsHaveSameLength(expected, result) &&
                     listsHaveContent(expected, result);

    chai.assert(conclusion, 'Lists are equal');
}


/* ##############
   # UNIT TESTS #
   ############## */
describe('FPCL Convertion', function() {
    describe('Converting from FPCL', function() {  // fpclToChecklists()
        it('Should convert a single list correctly', function() {
            var fpcl = `# Your first checklist

- [ ] Something to do
- [ ] Done item
`
            var expectedChecklists = [
                {
                    "title": "Your first checklist",
                    "items": [
                        {
                            "title": "Something to do",
                            "done": false
                        }, {
                            "title": "Done item",
                            "done": true
                        }
                    ]
                }
            ]
            var resultingChecklists = fpclToChecklists(fpcl);
            assertEqualFpcl(expectedChecklists, resultingChecklists);
        });

        it('Should convert a couple of lists correctly', function() {
            var fpcl = `# Your first checklist

- [ ] Something to do
- [x] Done item

# Another checklist

- [x] done stuff
- [x]I am the king of stuff
`
            var expectedChecklists = [
                {
                    "title": "Your first checklist",
                    "items": [
                        {
                            "title": "Something to do",
                            "done": false
                        }, {
                            "title": "Done item",
                            "done": true
                        }
                    ]
                }, {
                    "title": "Another checklist",
                    "items": [
                        {
                            "title": "done stuff",
                            "done": true
                        }, {
                            "title": "I am the king of stuff",
                            "done": true
                        }
                    ]
                }
            ]
            var resultingChecklists = fpclToChecklists(fpcl);
            assertEqualFpcl(expectedChecklists, resultingChecklists);
        });

        it('Should convert a couple of lists correctly, even if it includes an empty list', function() {
            var fpcl = `# Your first checklist

- [ ] Something to do
- [x] Done item

# Empty Checklist

# Not empty checklist

- [ ] to do
`
            var expectedChecklists = [
                {
                    "title": "Your first checklist",
                    "items": [
                        {
                            "title": "Something to do",
                            "done": false
                        }, {
                            "title": "Done item",
                            "done": true
                        }
                    ]
                }, {
                    "title": "Empty Checklist",
                    "items": []
                }, {
                    "title": "Not empty checklist",
                    "items": [
                        {
                            "title": "to do",
                            "done": false
                        }
                    ]
                }
            ]
            var resultingChecklists = fpclToChecklists(fpcl);
            assertEqualFpcl(expectedChecklists, resultingChecklists);
        });

        it('Should convert a couple of lists correctly, even if it includes an empty list in the end', function() {
            var fpcl = `# Your first checklist

- [ ] Something to do
- [x] Done item

# Not empty checklist

- [ ] to do

# Empty Checklist

`
            var expectedChecklists = [
                {
                    "title": "Your first checklist",
                    "items": [
                        {
                            "title": "Something to do",
                            "done": false
                        }, {
                            "title": "Done item",
                            "done": true
                        }
                    ]
                }, {
                    "title": "Not empty checklist",
                    "items": [
                        {
                            "title": "to do",
                            "done": false
                        }
                    ]
                }, {
                    "title": "Empty Checklist",
                    "items": []
                }
            ]
            var resultingChecklists = fpclToChecklists(fpcl);
            assertEqualFpcl(expectedChecklists, resultingChecklists);
        });
    });
});
