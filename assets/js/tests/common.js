describe('FPCL Convertion', function() {
    describe('Converting from FPCL', function() {  // fpclToChecklists()
        it('Should convert a single list correctly', function() {
            var fpcl = `Your first checklist
-Something to do
+Done item
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
            chai.assert.equal(expectedChecklists.length, resultingChecklists.length);
        });

        it('Should convert a couple of lists correctly', function() {
            var fpcl = `Your first checklist
-Something to do
+Done item

Another checklist
+done stuff
+I am the king of stuff
++I am the king of stuff+
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
                        }, {
                            "title": "+I am the king of stuff+",
                            "done": true
                        }
                    ]
                }
            ]
            var resultingChecklists = fpclToChecklists(fpcl);
            chai.assert.equal(expectedChecklists.length, resultingChecklists.length);
        });

        it('Should convert a couple of lists correctly, even if it includes an empty list', function() {
            var fpcl = `Your first checklist
-Something to do
+Done item

Empty Checklist

Not empty checklist
-to do
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
            chai.assert.equal(expectedChecklists.length, resultingChecklists.length);
        });

        it('Should convert a couple of lists correctly, even if it includes an empty list in the end', function() {
            var fpcl = `Your first checklist
-Something to do
+Done item

Not empty checklist
-to do

Empty Checklist

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
            chai.assert.equal(expectedChecklists.length, resultingChecklists.length);
        });
    });
});
