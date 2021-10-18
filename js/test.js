describe("Model Tests", function() {
    describe("Database Setup", function() {
        it("should setup a database if it doesn't exist", function(done) {
            dropDb();
            var archiveIndex = localStorage.getItem("index");
            chai.assert.ok(!archiveIndex);

            initDb();
            archiveIndex = localStorage.getItem("index");
            chai.assert.ok(archiveIndex === "[]");
            done();
        });
    });

    describe("Notes", function() {
        it("doesn't get inexistent notes", function(done) {
            var note = getNote("some note");

            chai.assert.ok(note === null);

            done();
        });

        it("creates notes", function(done) {
            var noteId = createNote();
            var note = getNote(noteId);

            chai.assert.ok(!!noteId);
            chai.assert.ok(note.id === noteId);
            chai.assert.ok(!!note.title);
            chai.assert.ok(note.kind === "md");

            var noteIndex = getNotes();
            var result = false;
            for (var i = 0; i < noteIndex.length; i++) {
                if (noteIndex[i] === noteId) {
                    result = true;
                }
            }
            chai.assert.ok(result);

            done();
        });

        it("updates notes", function(done) {
            var noteId = createNote();
            var note = getNote(noteId);
            var newContents = "Hello Joe!";
            var oldTitle = note.title;
            updateNote(noteId, {
                "contents": newContents
            });

            note = getNote(noteId);
            chai.assert.ok(note.title === oldTitle);
            chai.assert.ok(note.contents === newContents);

            done();
        });

        it("deletes notes", function(done) {
            const noteId = createNote();
            const verifyNote = function(noteId) {
                var notes = getNotes();
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i] == noteId)
                        return true;
                }
                return false;
            };

            chai.assert.ok(verifyNote(noteId));
            deleteNote(noteId);
            chai.assert.ok(!verifyNote(noteId));

            done();
        });
    });

    // TODO verify how to test backups without messing with existing data
    // describe("Backup", function() {
    //     it("should import notes", function(done) {
    //         var backup = {
    //             "k1": {
    //                 id: "k1",
    //                 title: "1st note",
    //                 contents: "hello joe!",
    //                 kind: "md"
    //             },
    //             "k2": {
    //                 id: "k2",
    //                 title: "2nd note",
    //                 contents: "hello frank!",
    //                 kind: "md"
    //             }
    //         }
    //         importNotes(backup);
    //         done();
    //     });
    // });
});
