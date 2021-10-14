describe("Model Tests", function() {
    describe("Database Setup", function() {
        it("should setup a database if it doesn't exist", function(done) {
            dropDb();
            var archiveIndex = localStorage.getItem("index");
            chai.assert.ok(!archiveIndex);

            initDb();
            archiveIndex = localStorage.getItem("index");
            console.log(archiveIndex);
            chai.assert.ok(archiveIndex === "[]");
            done();
        });
    });
});
