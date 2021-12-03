function pipe(inlet, functions) {
    var outlet = inlet;
    var limit = functions.length;
    for (var i = 0; i < limit; i++) {
        outlet = functions[i](outlet);
    }
    return outlet;
}
