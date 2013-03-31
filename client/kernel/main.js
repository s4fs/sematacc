/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

var updateConcernCompletions = function() {
    Meteor.call('updateConcernCompletions');
};

var updateAlphasCompletions = function() {
    Meteor.call('updateAlphasCompletions');
};