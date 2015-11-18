module.exports = function onAll(eventSources, cleanOnEvent, handler) {
    if (typeof handler === 'undefined')
        handler = cleanOnEvent;

}
