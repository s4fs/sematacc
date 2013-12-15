/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * Reactions to events of the Projects Dashboard.
 * All the events triggered when adding, editing, deleting, and selecting
 * projects are handled in this file
 */
Template.projects.events({
    'click a.showNewProject': function(event) {
        event.preventDefault();
        Session.set('editProjectId', null);
        $('input#nameNewProject').val("");
        $('textarea#descriptionNewProject').val("");
        $('button#makeNewProject').html('Add');
        $('div.newProject').show('400');
    },
    /**
     * Edit a Project name / description or create a new Project
     */
    'click button#makeNewProject': function(event) {
        event.preventDefault();
        var name = $('input#nameNewProject').val();
        var description = $('textarea#descriptionNewProject').val();
        if (name && description) {
            var projectId = Session.get('editProjectId');
            if (projectId) {
                Projects.update({
                    _id: projectId
                }, {
                    $set: {
                        name: name,
                        description: description
                    }
                });
                Session.set('editProjectId', null);
            } else {
                Meteor.call('newProject', name, description, Meteor.userId(),
                    function(error, result) {
                        if (error) {
                            alert('Error when creating project: ' + error);
                        } else {
                            Meteor.call('log', result, 'Project', 'Created');
                        }
                    });
            }
            $('div.newProject').hide(400);
        }
    },
    /**
     * Shows 'view', 'edit', 'delete' project buttons
     * on mouse hover
     */
    'mouseenter .accordionlabel': function(event) {
        var projectId = $(event.currentTarget).attr('for');
        $('#projectCommands' + this._id).show();
    },
    /**
     * Toggle 'view', 'edit', 'delete' project buttons
     * on mouse leave
     */
    'mouseleave .accordionlabel': function(event) {
        $('.projectCommands').hide();
    },
    /**
     * Causes the CSS accordion to open the item.
     * In this case, shows the Project description
     * on mouse click
     */
    'click .accordionlabel': function(event) {
        if (!$('input#' + this._id).attr('checked')) {
            $('input.accordionitem').removeAttr('checked');
        } else {
            setTimeout(function() {
                $('input.accordionitem').removeAttr('checked');
            }, 100);
        }
    },
    'click a.editProject': function(event) {
        event.preventDefault();
        var projectId = $(event.currentTarget).parent().parent().attr('for');
        Session.set('editProjectId', projectId);
        var project = Projects.findOne({
            _id: projectId,
            userId: Meteor.userId()
        });
        $('input#nameNewProject').val(project.name);
        $('textarea#descriptionNewProject').val(project.description);
        $('button#makeNewProject').html('Edit');
        $('div.newProject').show(400);
    },
    'click a.viewProject': function(event) {
        event.preventDefault();
        var projectId = $(event.currentTarget).parent().parent().attr('for');
        document.location.href = '/p/' + projectId;
        return;
    },

    /**
     * Delete a Project. If there are no other Projects,
     * create the default empty project.
     */
    'click a.deleteProject': function(event) {
        event.preventDefault();

        var isUserSure = window.confirm("Are you sure you want to delete this Project?");
        if (!isUserSure) return;

        var projectId = $(event.currentTarget).parent().parent().attr('for');
        if (Session.equals('selectedProjectId', projectId)) {
            Session.set('selectedProjectId', null);
            Session.set('selectedProjectName', null);
        }
        Projects.remove(projectId);
    }
});
