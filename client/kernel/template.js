/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */


 function asArray(obj){
    var result = [];
    for (var key in obj){
        if (obj[key].hasOwnProperty('order'))
            result.push({name:key,value:obj[key],order:obj[key].order});
        else
            result.push({name:key,value:obj[key]});
    }

    if (result != null && result[0].hasOwnProperty('order'))
            return result.sort(function(a,b) { return parseFloat(a.order) - parseFloat(b.order) } );
        else
            return result;
 }

 Template.kernel.concerns = function(){
    var projectId = Session.get('selectedProjectId');
    var project =  Projects.findOne({_id: projectId});
    return project.kernel.concerns;
 }

Template.kernel.getCurrentStateName = function(alpha) {
    if (alpha == null || alpha.currentStatePointer == null)
        return '';
    return ': ' + asArray(alpha.states)[alpha.currentStatePointer - 1].name;

};

Template.kernel.isCurrentState = function(currentStateOrder, alpha) {
    return currentStateOrder == alpha.value.currentStatePointer;
};