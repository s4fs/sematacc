/**
 * Copyright (C) 2013  Daniel Graziotin
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

Template.kernel.userProjects = function() {
  return Projects.find({
    userId: Meteor.userId()
  });
};

Template.kernel.concerns = function() {
  var projectId = Session.get('selectedProjectId');
  return Concerns.find({
    projectId: projectId,
    userId: Meteor.userId()
  });
};

Template.kernel.alphas = function(concernId) {
  var projectId = Session.get('selectedProjectId');
  return Alphas.find({
    concernId: concernId,
    userId: Meteor.userId()
  });
};

Template.kernel.currentState = function(stateId) {
  var state = States.findOne({
    _id: stateId,
    userId: Meteor.userId()
  });
  if(state) return ': ' + state.name;
  else return '';
};

Template.kernel.states = function(alphaId) {
  if(alphaId) return States.find({
    alphaId: alphaId,
    userId: Meteor.userId()
  });
  else return States.find({
    userId: Meteor.userId()
  });
};

Template.kernel.sameId = function(firstId, secondId) {
  return firstId == secondId;
};
