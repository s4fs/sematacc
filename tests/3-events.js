//tests/3-events.js
var assert = require('assert');

suite('Events', function() {
    test('Client/Server: Log an Event', function(done, server, client) {
        server.eval(function() {
            Events.find().observe({
                added: function(doc) {
                    emit('added', doc);
                }
            });
        });

        server.on('added', function(doc) {
            assert.equal(doc.projectId, 'fakeprojectid');
            assert.equal(doc.who, 'testalpha');
            assert.equal(doc.what, 'teststate');
            assert.equal((doc.when != null),true);
            assert.equal((doc.userId != null),true);
            done();
        });

        client.eval(function() {
            Accounts.createUser({
                email: 'a@a.com',
                password: '123456'
            }, function() {
                Meteor.loginWithPassword('a@a.com', '123456', function() {
                    Meteor.call('log', 'fakeprojectid', 'testalpha', 'teststate');
                });
            });
        });
    });
    test('Client/Server: Get an Event', function(done, server, client) {
        server.eval(function() {
            Events.find().observe({
                added: function(doc) {
                    emit('added', doc);
                }
            });
        });

        server.on('added', function(doc) {
            client.eval(function(){
                Meteor.loginWithPassword('a@a.com', '123456', function() {
                    Meteor.call('getLog', 'fakeprojectid', function(error, result){
                        emit('gotLog', result);
                    });
                });
            });  
        });


        client.on('gotLog', function(log){
            assert.equal((typeof(log) == 'string'), true);
            assert.equal(true, (log.indexOf('testalpha') > 1))
            done();
        });

        client.eval(function() {
            Accounts.createUser({
                email: 'a@a.com',
                password: '123456'
            }, function() {
                Meteor.loginWithPassword('a@a.com', '123456', function() {
                    Meteor.call('log', 'fakeprojectid', 'testalpha', 'teststate');
                });
            });
        });
    });
    test('Client/Server: un-auth Get an Event', function(done, server, client) {
        server.eval(function() {
            Events.find().observe({
                added: function(doc) {
                    emit('added', doc);
                }
            });
        });

        server.on('added', function(doc) {
            client.eval(function(){
                Meteor.loginWithPassword('b@b.com', '123456', function() {
                    Meteor.call('getLog', 'fakeprojectid', function(error, result){
                        emit('gotLog', result);
                    });
                });
            });  
        });


        client.on('gotLog', function(log){
            assert.equal((typeof(log) == 'string'), true);
            assert.equal(true, (log.indexOf('testalpha') < 0))
            done();
        });

        client.eval(function() {
            Accounts.createUser({
                email: 'b@b.com',
                password: '123456'
            }, function(){
                Accounts.createUser({
                    email: 'a@a.com',
                    password: '123456'
                }, function() {
                    Meteor.loginWithPassword('a@a.com', '123456', function() {
                        Meteor.call('log', 'fakeprojectid', 'testalpha', 'teststate');
                    });
                });
            });
        });
    });
    test('Server: Log an Event', function(done, server) {
        server.eval(function() {
            Meteor.call('log', 'fakeprojectid', 'daniel', 'testing', function(error, result) {
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
            Meteor.call('log', 'fakeprojectid', 'daniel', 'testing', function(error, result) {
                if (result) {
                    Meteor.call('getLog', 'fakeprojectid', function(error, result) {
                        if (result) {
                            emit('done', result);
                        }
                    });
                }
            });
        });

        server.once('done', function(result) {
            assert.equal(true, (result.indexOf('testing') > 1));
            done();
        });

    });
});
