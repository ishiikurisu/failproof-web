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
    });
});
