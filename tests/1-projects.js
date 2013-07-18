//tests/projects.js
var assert = require('assert');

suite('Projects', function() {
    test('Server: Presence of the DEMO project', function(done, server) {
        server.eval(function() {
            var prj = Projects.find().fetch();
            emit('done', prj);
        });

        server.on('done', function(projects) {
            assert.equal(projects.length, 1);
            assert.equal(projects[0].demo, true);
            assert.equal(projects[0].userId, null);
            done();
        });
    });
    test('Server: Adding a Project', function(done, server) {
        server.eval(function() {
            Meteor.call('newProject', '12345', '67890', function(error, result) {});
            var prj = Projects.find().fetch();
            emit('done', prj);
        });

        server.on('done', function(projects) {
            assert.equal(projects.length, 2);
            done();
        });
    });
    test('Server: Modfying a Project', function(done, server) {
        server.eval(function() {
            var id;
            Meteor.call('newProject', '12345', '67890', function(error, result) {
                if (result) {
                    id = result;
                    Projects.update({
                        _id: id
                    }, {
                        $set: {
                            name: 'testestest'
                        }
                    });
                    var prj = Projects.findOne({
                        _id: id
                    });
                    emit('done', prj);
                }

            });

        });

        server.on('done', function(projects) {
            assert.equal(projects.name, 'testestest');
            done();
        });
    });
    test('Server: Deleting a Project', function(done, server) {
        server.eval(function() {
            Meteor.call('newProject', '12345', '67890', function(error, result) {
                emit('created');
            });
        });

        server.on('created', function() {
            server.eval(function() {
                Projects.remove({
                    name: '12345'
                });
                emit('deleted');
            });
        });

        server.on('deleted', function() {
            server.eval(function() {
                prj = Projects.find().fetch();
                emit('done', prj);
            });
        });


        server.on('done', function(projects) {
            assert.equal(projects.length, 1);
            assert.equal(projects[0].name, 'Demo Project');
            done();
        });
    });
    test('Client/Server: Creating a Project', function(done, server, client) {
        server.eval(function() {
            Projects.find().observe({
                added: function(doc) {
                    if (doc.demo != true)
                        emit('added', doc);
                }
            });
        });

        server.on('added', function(doc) {
            assert.equal(doc.name, '12345');
            done();
        });

        client.eval(function() {
            Accounts.createUser({
                email: 'a@a.com',
                password: '123456'
            }, function() {
                Meteor.loginWithPassword('a@a.com', '123456', function() {
                    Meteor.call('newProject', '12345', '67890', false);
                });
            });
        });
    });

    test('Client/Server: un-auth Project get', function(done, server, client) {

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
                    var p = Projects.find({demo: false}).fetch();
                    emit('projectsFound', p);
                });
            });
        });

        client.on('projectsFound', function(p) {
            assert.equal(p.length, 0);
            done();
        });
    });

    test('Client/Server: Updating a Project', function(done, server, client) {
        server.eval(function() {
            Accounts.createUser({
                email: 'a@a.com',
                password: '123456'
            });
            emit('done');
        }).on('done', function() {
            server.eval(observeCollection);
        });

        function observeCollection() {
            Projects.find().observe({
                changed: function(newp, oldp) {
                    if (newp.demo != true)
                        emit('updated', newp);
                }
            });
        }

        server.on('updated', function(doc) {
            assert.equal(doc.name, 'hello');
            assert.equal(doc.description, 'hallo');
            done();
        });

        client.eval(function() {
            Meteor.loginWithPassword('a@a.com', '123456', function() {
                Meteor.call('newProject', '12345', '67890', false, function(error, result) {
                    Projects.update({
                        _id: result
                    }, {
                        $set: {
                            name: 'hello',
                            description: 'hallo'
                        }
                    });
                });
            });
        });
    });
    test('Client/Server: un-auth Edit Project', function(done, server, client) {

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
                    try {
                        Projects.update({
                            name: '12345'
                        }, {
                            $set: {
                                name: 'willneverhavethisname'
                            }
                        });
                    } catch (e) {
                        emit('triedToEdit');
                    }
                });
            });
        });

        client.on('triedToEdit', function() {
            done();
        });
    });
    test('Client/Server: Deleting a Project', function(done, server, client) {
        server.eval(function() {
            Accounts.createUser({
                email: 'a@a.com',
                password: '123456'
            });
            emit('done');
        }).on('done', function() {
            server.eval(observeCollection);
        });

        function observeCollection() {
            Projects.find().observe({
                removed: function(doc) {
                    if (doc.demo != true)
                        emit('removed', doc);
                }
            });
        }

        server.on('removed', function(doc) {
            assert.equal(doc.name, '12345');
            done();
        });

        client.eval(function() {
            Meteor.loginWithPassword('a@a.com', '123456', function() {
                Meteor.call('newProject', '12345', '67890', false, function(error, result) {
                    Projects.remove({
                        _id: result
                    });
                });
            });
        });
    });
    test('Client/Server: un-auth Deleting Project', function(done, server, client) {

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
                    try {
                        Projects.remove({
                            name: '12345'
                        });
                    } catch (e) {
                        emit('triedToRemove');
                    }
                });
            });
        });

        client.on('triedToRemove', function() {
            done();
        });
    });

});
