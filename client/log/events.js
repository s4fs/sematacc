/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

Template.log.events({
    /**
     * Display a Lightbox with the Project events formatted as a CSV File
     */
    'click a#export': function(event) {
        event.preventDefault();
        projectId = Session.get('selectedProjectId');
        Meteor.call('getLog', projectId, function(error, result) {
            $.colorbox({
                width: '95%',
                height: '95%',
                html: '<textarea style="width:95%;height:95%">' + result + '</textarea>',
                overlayClose: false,
            });
        });
    }
});
