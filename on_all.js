module.exports = function onAll(sources, clean, handler) {
    if (typeof handler === 'undefined') {
        handler = clean;
        clean = null;
    } else {
        cleanEvent = Object.keys(clean)[0];
        clean = clean[cleanEvent];
    }

    var eventsStack = [];
    var eventNames = Object.keys(sources);
    var cb = function(eventName) {
        if (eventsStack.indexOf(eventName) === -1)
            eventsStack.push(eventName);

        if (eventsStack.length == eventNames.length) {
            handler();
            eventsStack = [];
        }
    };

    eventNames.forEach(function(eventName) {
        sources[eventName].on(eventName, function() {
            cb(eventName);
        });
    });

    if (clean) {
        clean.on(cleanEvent, function() {
            eventsStack = [];
        });
    }
};
