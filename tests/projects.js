//tests/projects.js
var assert = require('assert');

suite('Projects', function() {
    test('Server: Presence of the DEMO project', function(done, server) {
        server.eval(function() {
            var prj = Projects.find().fetch();
            emit('done', prj);
        });

        server.once('done', function(projects) {
            assert.equal(projects.length, 1);
            assert.equal(projects[0].demo, true);
            assert.equal(projects[0].userId, null);
            done();
        });
    });
    test('Server: Adding a Project', function(done, server) {
        server.eval(function() {
            Meteor.call('newProject', '12345', '67890', function (error, result) {});
            var prj = Projects.find().fetch();
            emit('done', prj);
        });

        server.once('done', function(projects) {
            assert.equal(projects.length, 2);
            done();
        });
    });
    test('Server: Modfying a Project', function(done, server) {
        server.eval(function() {
            var id;
            Meteor.call('newProject', '12345', '67890', function (error, result) {
                id = result;
            });
            Projects.update({
                _id: id
            }, {
                $set: {
                    name: 'testestest'
                }
            });
            var prj = Projects.findOne({_id: id});
            emit('done', prj);
        });

        server.once('done', function(projects) {
            assert.equal(projects.name, 'testestest');
            done();
        });
    });
    test('Server: Deleting a Project', function(done, server) {
        server.eval(function() {
            var id;
            Meteor.call('newProject', '12345', '67890', function (error, result) {
                id = result;
            });
            Projects.remove({_id: id});
            var prj = Projects.find({}).fetch();
            emit('done', prj);
        });

        server.once('done', function(projects) {
            assert.equal(projects.length, 1);
            assert.equal(projects[0].name, 'Demo Project');
            done();
        });
    });

});