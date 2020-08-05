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
- [x] Done item
`
            var expectedChecklists = [
                {
                    "title": encodeURIComponent("Your first checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title": encodeURIComponent("Something to do"),
                            "done": false
                        }, {
                            "kind": "todo",
                            "title": encodeURIComponent("Done item"),
                            "done": true
                        }
                    ]
                }
            ]
            var resultingChecklists = fpclToChecklists(fpcl);
            assertEqualFpcl(expectedChecklists, resultingChecklists);
            
            fpcl = `# Your first checklist`
            expectedChecklists = [
                {
                    "title": encodeURIComponent("Your first checklist"),
                    "items": [ ]
                }
            ]
            resultingChecklists = fpclToChecklists(fpcl);
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
                    "title": encodeURIComponent("Your first checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title": encodeURIComponent("Something to do"),
                            "done": false
                        }, {
                            "kind": "todo",
                            "title": encodeURIComponent("Done item"),
                            "done": true
                        }
                    ]
                }, {
                    "title": encodeURIComponent("Another checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title": encodeURIComponent("done stuff"),
                            "done": true
                        }, {
                            "kind": "todo",
                            "title": encodeURIComponent("I am the king of stuff"),
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
                    "title": encodeURIComponent("Your first checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title":encodeURIComponent("Something to do"),
                            "done": false
                        }, {
                            "kind": "todo",
                            "title":encodeURIComponent("Done item"),
                            "done": true
                        }
                    ]
                }, {
                    "title":encodeURIComponent("Empty Checklist"),
                    "items": []
                }, {
                    "title":encodeURIComponent("Not empty checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title":encodeURIComponent("to do"),
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
                    "title": encodeURIComponent("Your first checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title": encodeURIComponent("Something to do"),
                            "done": false
                        }, {
                            "kind": "todo",
                            "title": encodeURIComponent("Done item"),
                            "done": true
                        }
                    ]
                }, {
                    "title": encodeURIComponent("Not empty checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title": encodeURIComponent("to do"),
                            "done": false
                        }
                    ]
                }, {
                    "title": encodeURIComponent("Empty Checklist"),
                    "items": []
                }
            ]
            var resultingChecklists = fpclToChecklists(fpcl);
            assertEqualFpcl(expectedChecklists, resultingChecklists);
        });

        it('Should convert a couple of lists with notes', function() {
            var fpcl = `# Your first checklist

- [ ] Something to do
- [x] Done item
FPCL's first note

# Note only checklist

This checklist contains a note only,
with two lines of notes.

# Empty Checklist

`
            var expectedLists = [
                {
                    "title": encodeURIComponent("Your first checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title": encodeURIComponent("Something to do"),
                            "done": false
                        }, {
                            "kind": "todo",
                            "title": encodeURIComponent("Done item"),
                            "done": true
                        }, {
                            "kind": "note",
                            "title": encodeURIComponent("FPCL's first note")
                        }
                    ]
                }, {
                    "title": encodeURIComponent("Note only checklist"),
                    "items": [
                        {
                            "kind": "note",
                            "title": encodeURIComponent("This checklist contains a note only,")
                        }, {
                            "kind": "note",
                            "title": encodeURIComponent("with two lines of notes.")
                        }
                    ]
                }, {
                    "title": encodeURIComponent("Empty Checklist"),
                    "items": []
                }
            ]
            var resultingLists = fpclToChecklists(fpcl);
            assertEqualFpcl(expectedLists, resultingLists);
        });
    });

    describe("Converting to FPCL", function() { // checklistsToFpcl()
        it("Should convert checklists to Markdown", function() {
            var checklists = [
                {
                    "title": "Your first checklist",
                    "items": [
                        {
                            "kind": "todo",
                            "title": "Something to do",
                            "done": false
                        }, {
                            "kind": "todo",
                            "title": "Done item",
                            "done": true
                        }
                    ]
                }
            ];

            var expected = `# Your first checklist

- [ ] Something to do
- [x] Done item
`;

            var result = checklistsToFpcl(checklists);
            chai.assert.equal(expected, result);
        });

        it("Should convert notes to Markdown", function() {
            var checklists = [
                {
                    "title": "Your first list",
                    "items": [
                        {
                            "kind": "note",
                            "title": "Your first note"
                        }
                    ]
                }
            ];

            var expected = `# Your first list

Your first note
`;

            var result = checklistsToFpcl(checklists);
            chai.assert.equal(expected, result);
        });

        it("Shouldn't mix notes and to do items", function() {
            var checklists = [
                {
                    "title": "Your first list",
                    "items": [
                        {
                            "kind": "todo",
                            "title": "First item",
                            "done": false
                        }, {
                            "kind": "note",
                            "title": "Second item"
                        }, {
                            "kind": "note",
                            "title": "Third item"
                        }, {
                            "kind": "todo",
                            "title": "Fourth item",
                            "done": false
                        }
                    ]
                }
            ];

            var expected = `# Your first list

- [ ] First item
Second item
Third item
- [ ] Fourth item
`;

            var result = checklistsToFpcl(checklists);
            chai.assert.equal(expected, result);
        });

        it("Should draw lists with space between then", function() {
            var checklists = [
                {
                    "title": "Your first list",
                    "items": [
                        {
                            "kind": "todo",
                            "title": "An item",
                            "done": false
                        }
                    ]
                }, {
                    "title": "Your second list",
                    "items": [
                        {
                            "kind": "note",
                            "title": "Another item"
                        }
                    ]
                }
            ];

            var expected = `# Your first list

- [ ] An item

# Your second list

Another item
`;

            var result = checklistsToFpcl(checklists);
            chai.assert.equal(expected, result);
        });
    });
});

describe("Auxiliar Functions", function() {
    describe("Identify Kind", function() {
        it("Should correctly identify the line kind", function() {
            let scenarios = [
                {
                    content: "",
                    expected: "empty"
                }, {
                    content: "# Title",
                    expected: "title"
                }, {
                    content: "- [ ] To do task",
                    expected: "todo"
                }, {
                    content: "- [x] Done task",
                    expected: "todo"
                }, {
                    content: "Random content",
                    expected: "note"
                }, {
                    content: "- List",
                    expected: "note"
                },
            ];
            for (var i = 0; i < scenarios.length; i++) {
                var scenario = scenarios[i];
                var result = identifyKind(scenario.content);
                chai.assert.equal(scenario.expected, result);
            }
        });
    });
});

/* #####################
   # INTEGRATION TESTS #
   ##################### */
describe('FPCL API Integration', function() {
    describe('Users', function() {  // fpclToChecklists()
        it('Should be able to create users', function(done) {
            // set fo false so we don't create new users
            if (false) {
                var request = new XMLHttpRequest();
                request.open('POST', 'https://fpcl.herokuapp.com/users/create', true);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                request.onload = function() {
                    var result = false;
                    if (this.status >= 200 && this.status < 400) {
                        result = true;
                    }
                    chai.assert(result);
                    done();
                }
                request.send(JSON.stringify({
                    username: "username",
                    password: "password",
                    notes: null
                }));
            } else {
                done();
            }
        });

        it('Should be able to authorize users', function(done) {
            var auth_key = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMiJ9.OVI3Dw2B-2Uu9irHqpJCRHJ5E4g3YdkMzb71SeoMwck"

            var request = new XMLHttpRequest();
            request.open('POST', 'https://fpcl.herokuapp.com/users/auth', true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.onload = function() {
                var result = false;
                if (this.status >= 200 && this.status < 400) {
                    var response = JSON.parse(this.response);
                    result = response["auth_key"] == auth_key;
                }
                chai.assert(result);
                done();
            }
            request.send(JSON.stringify({
                username: "username",
                password: "password"
            }));
        });
    });

    describe('Notes', function() {
        it('Should be able to get notes', function(done) {
            var auth_key = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMiJ9.OVI3Dw2B-2Uu9irHqpJCRHJ5E4g3YdkMzb71SeoMwck";
            var request = new XMLHttpRequest();
            request.open('GET', `https://fpcl.herokuapp.com/notes?auth_key=${auth_key}`, true);
            request.onload = function() {
                var result = false;
                if (this.status >= 200 && this.status < 400) {
                    var response = JSON.parse(this.response);
                    result = response["notes"] == "";
                }
                chai.assert(result);
                done();
            }
            request.send();
        });

        it('Should be able to update notes', function(done) {
            const changeNotesBackCallback = function(auth_key, oldNotes) {
                var request = new XMLHttpRequest();
                request.open('POST', 'https://fpcl.herokuapp.com/notes', true);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                request.onload = function() {
                    var result = false;
                    if (this.status >= 200 && this.status < 400) {
                        result = JSON.parse(this.response).error === null;
                    }
                    chai.assert(result);
                    done();
                }
                request.send(JSON.stringify({
                    auth_key: auth_key,
                    notes: oldNotes
                }));
            }

            const checkIfUpdateWorkedCallback = function(auth_key, oldNotes, newNotes) {
                var request = new XMLHttpRequest();
                request.open('GET', `https://fpcl.herokuapp.com/notes?auth_key=${auth_key}`, true);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                request.onload = function() {
                    var result = false;
                    if (this.status >= 200 && this.status < 400) {
                        var response = JSON.parse(this.response);
                        chai.assert(response["notes"] === newNotes);
                        changeNotesBackCallback(auth_key, oldNotes);
                    } else {
                        chai.assert(false);
                        done();
                    }
                }
                request.send();
            }

            const afterAuthCallback = function(auth_key, oldNotes, newNotes) {
                var request = new XMLHttpRequest();
                request.open('POST', 'https://fpcl.herokuapp.com/notes', true);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                request.onload = function() {
                    var result = false;
                    if (this.status >= 200 && this.status < 400) {
                        chai.assert(JSON.parse(this.response).error === null);
                        checkIfUpdateWorkedCallback(auth_key, oldNotes, newNotes);
                    } else {
                        chai.assert(false);
                        done();
                    }
                }
                request.send(JSON.stringify({
                    auth_key: auth_key,
                    notes: newNotes
                }));
            }

            const checkAuthWorksCallback = function(auth_key, newNotes) {
                var request = new XMLHttpRequest();
                request.open('POST', 'https://fpcl.herokuapp.com/users/auth', true);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                request.onload = function() {
                    var result = false;
                    if (this.status >= 200 && this.status < 400) {
                        var response = JSON.parse(this.response);
                        chai.assert(response["auth_key"] === auth_key);
                        afterAuthCallback(response["auth_key"], response["notes"], newNotes);
                    } else {
                        chai.assert(false);
                        done();
                    }
                }
                request.send(JSON.stringify({
                    username: "username",
                    password: "password"
                }));
            }


            var auth_key = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMiJ9.OVI3Dw2B-2Uu9irHqpJCRHJ5E4g3YdkMzb71SeoMwck"
            var newNotes = `# Just a title here
`;

            checkAuthWorksCallback(auth_key, newNotes);
        });
    });
});
