export const helpers = {
    'if_eq': function (a, b, opts) {
        console.log("a: " + a + " b: " + b);
        if (a === b)
            return opts.fn(this);
        else
            return opts.inverse(this);
    },
    'times' : function(n, block) {
        let accum = '';
        for(let i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    }
}

