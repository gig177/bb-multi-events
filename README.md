# bb-utils
Simple example:
```javascript
var _ = require('underscore'),
    Events = require('backbone').Events;
var onAll = require('../lib/on_all');
    
var view = _.extend({}, Events),
    collection = _.extend({}, Events);
onAll({ 'animation-complete': view, 'sync': collection }, { 'render-page': view }, () => {
    console.log('render page after animation and sync collection'); // [1]
});

view.trigger('animation-complete'); 
collection.trigger('sync'); // will trigger the =>[1] statement

view.trigger('animation-complete'); 
view.trigger('render-page'); // will clean the events stack

collection.trigger('sync');
view.trigger('animation-complete'); // will trigger the =>[1] statement
```
