// Auxiliar function
function drawChecklists(checklists) {
    var content = document.getElementById("content");
    var outlet = `
        <p>No checklists yet! Why don't you add some?</p>
    `;

    if (checklists !== null) {
        outlet = `
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
        `;

        for (i = 0; i < checklists.length; i++) {
            var items = checklists[i].split('\n');
            var title = items[0];
            outlet += `
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h4 class="card-title">` + title + `</h4>
                                    <a role="button" href="/view?which=` + i + `" class="btn btn-primary">View</a>
                                </div>
                            </div>
                        </div>
            `;
        }

        outlet += `
                    </div>
                </div>
            </div>
        `;
    }

    content.innerHTML = outlet;
}
