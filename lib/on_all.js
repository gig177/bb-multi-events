module.exports = function onAll(eventSources, clean, handler) {
    if (typeof handler === 'undefined') {
        handler = clean;
        clean = null;
    } else {
        cleanEvent = Object.keys(clean)[0];
        clean = clean[cleanEvent];
    }

    var events = [];
    var count = Object.keys(eventSources).length;
    var _handler = (eventName) => {
        if (events.indexOf(eventName) === -1)
            events.push(eventName);

        if (events.length == count) {
            handler();
            events = [];
        }
    };

    Object.keys(eventSources).forEach(function(eventName) {
        eventSources[eventName].on(eventName, () => {
            _handler(eventName);
        });
    });

    if (typeof clean !== 'function') {
        clean.on(cleanEvent, () => {
            events = [];
        });
    }
};
