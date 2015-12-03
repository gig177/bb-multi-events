# bb-multi-events
Subscribe on mulitple events permanently:
```javascript
var _ = require('underscore'),
    Events = require('backbone').Events;
var onAll = require('bb-multi-events/on_all');
    
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
Subscribe on mulitple events just once:
```javascript
...
onceAll({ 'animation-complete': view, 'sync': collection }, () => {
    console.log('render page after animation and sync collection'); // [2]
});

view.trigger('animation-complete'); 
collection.trigger('sync'); // will trigger the =>[2] statement

view.trigger('animation-complete');
collection.trigger('sync'); // mute
```
### Instalation:
```
$ jspm install npm:bb-multi-events
```
```
$ npm install bb-multi-events
```
