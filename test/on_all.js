var Backbone = require('backbone'),
    _ = require('underscore'),
    sinon = require('sinon'),
    chai = require('chai'),
    sinonChai = require('sinon-chai');
var expect = chai.expect;
var onAll = require('../lib/on_all');

chai.use(sinonChai);
describe('Subscribe on multiple events', () => {
    var view = _.extend({}, Backbone.Events),
        collection = _.extend({}, Backbone.Events);

    it('calls the original function', () => {
        var spy = sinon.spy();

        onAll({ 'animation-complete': view, 'sync': collection }, { 'render-page': view }, spy);
        view.trigger('animation-complete'); 
        collection.trigger('sync');

        expect(spy).to.have.been.calledOnce;
    });
    it('does not call the original function', () => {
        var spy = sinon.spy();

        onAll({ 'animation-complete': view, 'sync': collection }, { 'render-page': view }, spy);
        view.trigger('animation-complete'); 

        expect(spy).to.have.not.been.called;
    });
});
