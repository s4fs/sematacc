//tests/3-kernel.js
var assert = require('assert');

suite('Kernel', function() {
    test('Client/Server: Presence of Concerns, Alphas, and States', function(done, server, client) {
        client.eval(function() {
            Accounts.createUser({
                email: 'b@b.com',
                password: 'password'
            }, function() {
                Meteor.loginWithPassword('b@b.com', 'password', function(error) {
                    Meteor.call('newProject', 'qwe', 'test', function(error, result) {
                        if (result) {
                            var project = Projects.find({
                                _id: result,
                                userId: Meteor.userId()
                            }).fetch();
                            emit('projectCreated', project);
                        }
                    });
                });
            });
        });

        client.on('projectCreated', function(doc) {
            server.eval(function() {
                var p = Projects.findOne({
                    name: 'qwe'
                });
                var c = Concerns.find({
                    projectId: p._id
                }).fetch();
                var a = Alphas.find({
                    projectId: p._id
                }).fetch();
                var s = States.find({
                    projectId: p._id
                }).fetch();
                emit('serverLookup', {
                    concerns: c,
                    alphas: a,
                    states: s
                });
            })

        });

        server.on('serverLookup', function(doc) {
            assert.equal(doc.concerns.length, 3);
            assert.equal(doc.alphas.length, 7);
            assert.equal(doc.states.length, 41);
            done();
        });

    });
    test('Client/Server: Project Completion', function(done, server, client) {
        client.eval(function() {
            Accounts.createUser({
                email: 'b@b.com',
                password: 'password'
            }, function() {
                Meteor.loginWithPassword('b@b.com', 'password', function(error) {
                    Meteor.call('newProject', 'qwe', 'test', function(error, result) {
                        if (result) {
                            var project = Projects.findOne({
                                _id: result,
                                userId: Meteor.userId()
                            });
                            emit('projectCreated', project);
                        }
                    });
                });
            });
        });

        client.on('projectCreated', function(doc) {
            server.eval(function() {
                var p = Projects.findOne({
                    name: 'qwe'
                });
                var c = Concerns.findOne({
                    projectId: p._id,
                    name: 'Customer'
                });
                var a = Alphas.findOne({
                    concernId: c._id,
                    name: 'Opportunity'
                });
                var s = States.findOne({
                    alphaId: a._id,
                    name: 'Benefit Accrued'
                });
                Alphas.update({
                    _id: a._id
                }, {
                    $set: {
                        currentStateId: s._id
                    }
                });
                Meteor.flush();
                emit('serverLookup', c);
            })

        });

        server.on('serverLookup', function(doc) {
            assert.equal(doc.completion, 0);
            client.eval(function() {
                var p = Projects.findOne({
                    name: 'qwe'
                });
                console.log(p);
                Meteor.call('updateAlphasCompletions', p._id, function(error, result) {
                    Meteor.call('updateConcernCompletions', p._id, function(error, result) {
                        emit('updateCompleted', p);
                    });
                })
            });
        });

        client.on('updateCompleted', function(p) {
            server.eval(function() {
                Meteor.flush();
                var p = Projects.findOne({
                    name: 'qwe'
                });
                var c = Concerns.findOne({
                    projectId: p._id,
                    name: 'Customer'
                });
                var a = Alphas.findOne({
                    concernId: c._id,
                    name: 'Opportunity'
                });
                emit('verifyCompletion', c);
            })
        })

        server.on('verifyCompletion', function(doc) {
            assert.equal(doc.completion, 50);
            done();
        });

    });

    test('Client/Server: un-auth Concern get', function(done, server, client) {
        client.eval(function() {
            Accounts.createUser({
                email: 'a@a.com',
                password: '123456'
            }, function() {
                Accounts.createUser({
                    email: 'b@b.com',
                    password: '123456'
                }, function() {
                    emit('usersCreated');
                });
            });
        }).on('usersCreated', function() {
            client.eval(function() {
                Meteor.loginWithPassword('a@a.com', '123456', function() {
                    Meteor.call('newProject', '12345', '67890', false, function(error, result) {
                        emit('projectCreated');
                    });
                });
            });
        });

        client.on('projectCreated', function() {
            client.eval(function() {
                Meteor.loginWithPassword('b@b.com', '123456', function() {
                    var c = Concerns.find({}).fetch();
                    emit('ConcernsFound', c);
                });
            });
        });

        client.on('ConcernsFound', function(concerns) {
            assert.equal(concerns.length, 0);
            done();
        });
    });

    test('Client/Server: un-auth Alpha get', function(done, server, client) {
        client.eval(function() {
            Accounts.createUser({
                email: 'a@a.com',
                password: '123456'
            }, function() {
                Accounts.createUser({
                    email: 'b@b.com',
                    password: '123456'
                }, function() {
                    emit('usersCreated');
                });
            });
        }).on('usersCreated', function() {
            client.eval(function() {
                Meteor.loginWithPassword('a@a.com', '123456', function() {
                    Meteor.call('newProject', '12345', '67890', false, function(error, result) {
                        emit('projectCreated');
                    });
                });
            });
        });

        client.on('projectCreated', function() {
            client.eval(function() {
                Meteor.loginWithPassword('b@b.com', '123456', function() {
                    var a = Alphas.find({}).fetch();
                    emit('AlphasFound', a);
                });
            });
        });

        client.on('AlphasFound', function(alphas) {
            assert.equal(alphas.length, 0);
            done();
        });
    });
    
    test('Client/Server: un-auth State get', function(done, server, client) {
        client.eval(function() {
            Accounts.createUser({
                email: 'a@a.com',
                password: '123456'
            }, function() {
                Accounts.createUser({
                    email: 'b@b.com',
                    password: '123456'
                }, function() {
                    emit('usersCreated');
                });
            });
        }).on('usersCreated', function() {
            client.eval(function() {
                Meteor.loginWithPassword('a@a.com', '123456', function() {
                    Meteor.call('newProject', '12345', '67890', false, function(error, result) {
                        emit('projectCreated');
                    });
                });
            });
        });

        client.on('projectCreated', function() {
            client.eval(function() {
                Meteor.loginWithPassword('b@b.com', '123456', function() {
                    var s = States.find({}).fetch();
                    emit('StatesFound', s);
                });
            });
        });

        client.on('StatesFound', function(states) {
            assert.equal(states.length, 0);
            done();
        });
    });
});
