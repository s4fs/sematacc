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

var updateConcernCompletions = function() {
    var concerns = Concerns.find({userId: Meteor.userId()});
    concerns.forEach(function(concern) {
      var alphas = Alphas.find({
        concernId: concern._id,
        userId: Meteor.userId()
      }).fetch();
      var completions = 0;
      alphas.forEach(function(alpha) {
        completions += alpha.completion;
      });
      Concerns.update({
        _id: concern._id,
        userId: Meteor.userId()
      }, {
        $set: {
          completion: completions / alphas.length
        }
      });
    });
  };

var updateAlphasCompletions = function() {
    var alphas = Alphas.find({userId: Meteor.userId()});
    alphas.forEach(function(alpha) {
      var alphaStatesCount = States.find({
        alphaId: alpha._id,
        userId: Meteor.userId()
      }).count();

      var currentStatePosition = 0;
      if (alpha.currentStateId) {
        currentStatePosition = States.findOne({
          _id: alpha.currentStateId,
          userId: Meteor.userId()
        }).order;
      }

      var ratio = currentStatePosition / alphaStatesCount * 100;
      Alphas.update({
        _id: alpha._id,
        userId: Meteor.userId()
      }, {
        $set: {
          completion: ratio
        }
      });
    });
};