export const helpers = {
    'if_eq': function (a, b, opts) {
        console.log("a: " + a + " b: " + b);
        if (a === b)
            return opts.fn(this);
        else
            return opts.inverse(this);
    },
}

