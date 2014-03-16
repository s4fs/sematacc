/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * This file implements the server-side methods, which will be public for the client.
 */


/**
 * Create and save a new Project
 * @param  {string} name        Name of the Project
 * @param  {string} description Description of the Project
 * @param  {bool} is the proejct a demo project?
 * @return {int}             The Meteor/MongoDB id of the Project
 */
newProject = function(name, description, demo) {
    if (!typeof(name) === 'string' || !name) {
        return 'Error. Wrong projectId supplied. Please contact the developer.';
    }
    if (!typeof(description) === 'string' || !description) {
        return 'Error. Wrong description supplied. Please contact the developer.';
    }
    if (typeof(demo) === 'undefined') {
        demo = false;
    }

    var concernId = 0;
    var alphaId = 0;
    var stateId = 0;

    var alphaCounter = 0;

    var userId;
    if (demo === true)
        userId = null;
    else
        userId = Meteor.userId();

    var project = {};

    var currentKernelSkeleton = kernelSkeleton;

    Object.keys(currentKernelSkeleton.concerns).forEach(function(concern) {

            var concernName = concern;

            currentKernelSkeleton.concerns[concern].domId = Random.id();

            Object.keys(currentKernelSkeleton.concerns[concern].alphas).forEach(function(alpha) {

                    var alphaName = alpha;

                    currentKernelSkeleton.concerns[concern].alphas[alpha].description = alphaDescriptions[alphaName.toLowerCase()];
                    currentKernelSkeleton.concerns[concern].alphas[alpha].domId = Random.id();

                    Object.keys(currentKernelSkeleton.concerns[concern].alphas[alpha].states).forEach(function(state) {
                            currentKernelSkeleton.concerns[concern].alphas[alpha].states[state].description = stateDescriptions[alphaName.toLowerCase()][state.toLowerCase()];
                            currentKernelSkeleton.concerns[concern].alphas[alpha].states[state].domId = Random.id();
                    });
            });
        });

        project.name = name; 
        project.description = description; 
        project.demo = demo; 
        project.userId = userId;

        project.kernel = new Object(); 
        project.kernel.concerns = currentKernelSkeleton.concerns;

        projectId = Projects.insert(
            project
        );

        return projectId;
    };


    /**
     * Calculate the percentage of completion of each Concern.
     * Should be called after an Alpha switches to a new State and its completion has been done.
     */
    updateProject = function(projectId, concern, alpha, newStatePointer) {
        if (typeof(projectId) !== 'string' || !projectId) {
            throw new Meteor.Error(500, 'Error. Wrong projectId (' + projectId + ') supplied. Please contact the developer.');
        }

        var project = Projects.findOne({
            _id: projectId
        });

        if (!project)
            return;

        project.kernel.concerns[concern].alphas[alpha].currentStatePointer = newStatePointer;

        for (concern in project.kernel.concerns) {
            for (alpha in project.kernel.concerns[concern].alphas) {
                var alphaStatesCount = 0;
                for (s in project.kernel.concerns[concern].alphas[alpha].states)
                    if (project.kernel.concerns[concern].alphas[alpha].states.hasOwnProperty(s))
                        alphaStatesCount++;

                var currentStatePointer = project.kernel.concerns[concern].alphas[alpha].currentStatePointer;

                var ratio = currentStatePointer / alphaStatesCount * 100;
                project.kernel.concerns[concern].alphas[alpha].completion = ratio;
            }

            var alphasCount = 0;
            var alphasCompletion = 0;
            for (alpha in project.kernel.concerns[concern].alphas) {
                alphasCount++;
                alphasCompletion += project.kernel.concerns[concern].alphas[alpha].completion;
            }

            var ratio = alphasCompletion / alphasCount;
            project.kernel.concerns[concern].completion = ratio;
        }

        Projects.update({
                _id: project._id
            },
            project

        );
    };

    /**
     * Log an event in the database
     * @param  {string} projectId Meteor/MongoDB id of the project
     * @param  {string} who       who is causing the event / where is the event happening
     * @param  {string} what      the event happening
     */
    log = function(projectId, who, what) {
        if (typeof(projectId) === 'undefined' || !projectId) {
            return 'Error. Wrong projectId supplied. Please contact the developer.';
        }
        if (typeof(who) === 'undefined' || !who) {
            return 'Error. Wrong who supplied. Please contact the developer.';
        }
        if (typeof(what) === 'undefined' || !what) {
            return 'Error. Wrong what supplied. Please contact the developer.';
        }

        var userId = Meteor.userId();
        var timestamp = new Date();
        eventobj = {
            when: timestamp,
            projectId: projectId,
            who: who,
            what: what,
            userId: Meteor.userId()
        };
        Events.insert(eventobj);
        return true;
    };

    /**
     * Return events as a CSV text string
     */
    getLog = function(projectId) {
        if (typeof(projectId) === 'undefined' || !projectId) {
            return 'Error. Wrong projectId supplied. Please contact the developer.';
        }
        var userId = Meteor.userId();
        var events = Events.find({
            projectId: projectId,
            userId: userId
        });
        var buffer = 'WHEN,WHO,WHAT\n';
        events.forEach(function(ev) {
            buffer = buffer + '"' + ev.when.toISOString() + '","' + ev.who + '","' + ev.what + '"\n';
        });
        return buffer;
    };