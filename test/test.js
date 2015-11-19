var Backbone = require('backbone'),
    _ = require('underscore'),
    sinon = require('sinon'),
    chai = require('chai'),
    sinonChai = require('sinon-chai');
var expect = chai.expect;
var onAll = require('../lib/on_all'),
    onceAll = require('../lib/once_all');

var view = _.extend({}, Backbone.Events),
    collection = _.extend({}, Backbone.Events);

chai.use(sinonChai);
describe('Subscribe on multiple events', () => {

    it('calls the original function twice', () => {
        var spy = sinon.spy();

        onAll({ 'animation-complete': view, 'sync': collection }, { 'render-page': view }, spy);

        view.trigger('animation-complete');
        collection.trigger('sync');

        view.trigger('animation-complete');
        view.trigger('render-page');

        collection.trigger('sync');
        view.trigger('animation-complete');

        expect(spy).to.have.been.calledTwice;
    });
    it('does not call the original function', () => {
        var spy = sinon.spy();

        onAll({ 'animation-complete': view, 'sync': collection }, { 'render-page': view }, spy);
        view.trigger('animation-complete');

        expect(spy).to.have.not.been.called;
    });
    it('should be called without cleaner', () => {
        var spy = sinon.spy();

        onAll({ 'animation-complete': view, 'sync': collection }, spy);

        view.trigger('animation-complete');
        collection.trigger('sync');

        expect(spy).to.have.been.calledOnce;
    });
});
describe('Subscribe on multiple events once', () => {
    it('calls the original function once', () => {
        var spy = sinon.spy();

        onceAll({ 'animation-complete': view, 'sync': collection }, spy);

        view.trigger('animation-complete'); 
        collection.trigger('sync');

        view.trigger('animation-complete'); 
        collection.trigger('sync');

        expect(spy).to.have.been.calledOnce;
    });
    //onceAll.call(view, ['animation-complete', 'page-rendered'], spy);
    //onceAll.call(view, ['animation-complete', 'page-rendered', { 'sync': collection }], spy);
});
