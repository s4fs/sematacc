//tests/projects.js
var assert = require('assert');

suite('Events', function() {
    test('Server: Log an Event', function(done, server) {
        server.eval(function() {
            Meteor.call('log', 'fakeprojectid', 'daniel', 'testing', function (error, result) {
                if (result)
                    emit('done', result);
            });
        });

        server.once('done', function(result) {
            assert.equal(result, true);
            done();
        });
    });
    test('Server: Retrieve an Event', function(done, server) {
        server.eval(function() {
            Meteor.call('log', 'fakeprojectid', 'daniel', 'testing', function (error, result) {
                if (result){
                    Meteor.call('getLog', 'fakeprojectid',function (error, result) {
                        if (result){
                            emit('done', result);
                        }
                    });
                }
            });
        });

        server.once('done', function(result) {
            assert.equal(true,(result.indexOf('testing') > 1))
            done();
        });
    });
});