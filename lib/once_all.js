/*
 * This snippet refers to this answer:
 * http://stackoverflow.com/questions/16033346/is-there-any-way-to-wait-to-invoke-callback-until-multiple-backbone-collection-h/16034887#16034887
 */
var _ = require('underscore');
module.exports = function onceAll(sources, handler) {
    var eventNames = Object.keys(sources);
    handler = _.after(eventNames.length, handler);
    eventNames.forEach(eventName => {
        sources[eventName].once(eventName, handler);
    });
}
