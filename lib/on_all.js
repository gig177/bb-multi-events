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
    var cb = eventName => {
        if (eventsStack.indexOf(eventName) === -1)
            eventsStack.push(eventName);

        if (eventsStack.length == eventNames.length) {
            handler();
            eventsStack = [];
        }
    };

    eventNames.forEach(function(eventName) {
        sources[eventName].on(eventName, () => {
            cb(eventName);
        });
    });

    if (typeof clean === 'function') {
        clean.on(cleanEvent, () => {
            eventsStack = [];
        });
    }
};
