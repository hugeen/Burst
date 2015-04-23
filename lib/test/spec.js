// describe('spec', function (it, beforeFilter) {

//     it('hello', function (done) {
//         should(true);
//     });

// });


var contextChain = new WeakMap();
var contextMap = new Map();
var currentContext = null;


export function describe (name, description) {
    openContext(buildContext(name, description));
    description();
    closeContext();
};


function openContext (context) {
    if (currentContext) {
        contextChain.set(context, currentContext);
    }

    currentContext = context;
}


function closeContext () {
    currentContext = getParentContext(currentContext);
}


function buildContext (name, description) {
    var context = {
        name,
        before: [],
        sequence: []
    };
    contextMap.set(description, context);

    return context;
}


function getContext (description) {
    return contextMap.get(description);
}


function getParentContext (context) {
    if (contextChain.has(context)) {
        return contextChain.get(context);
    } else {
        return null;
    }
}


export function beforeEach (body) {
    currentContext.before.push(body);
};


export function it (message, body) {
    currentContext.sequence.push(body);
};


export function run () {
    contextMap.forEach(runSequence);
};


export function runSequence (context) {
    context.sequence.forEach(function (it) {
        context.before.forEach(b => b());
        it();
    });
}