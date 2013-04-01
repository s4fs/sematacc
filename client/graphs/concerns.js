/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * Build a generic HBar graph (Horizontal Histogram)
 * @param  {string} elemId    the target element Id where the graph will be
 * @param  {[number]} data      the data to be represented
 * @param  {[string]} labels    the corresponding labels for the data elements
 * @return {RGraph.HBar}           The generated RGraph HBar graph
 */
var buildHbarGraph = function(elemId, data, labels) {
  if (!(elemId || data || labels)) return;
  var hbar = new RGraph.HBar(elemId, data);

  var grad = hbar.context.createLinearGradient(0, 0, hbar.canvas.width, 0);
  grad.addColorStop(0, '#CE5F54');
  grad.addColorStop(0.60, '#FFFFE5');
  grad.addColorStop(1, '#63994C');
  hbar.Set('chart.labels', labels);
  hbar.Set('chart.gutter.left', 90);
  hbar.Set('chart.background.barcolor1', 'white');
  hbar.Set('chart.background.barcolor2', 'white');
  hbar.Set('chart.background.grid', false);
  hbar.Set('chart.colors', [grad]);
  hbar.Set('chart.xmax', 100);
  return hbar;

};

/**
 * Build a HBar Graph representing the Concerns completion
 * @param  {string} elemId            the target element ID to contain the graph.
 * @param  {string} selectedProjectId the Meteor/Mongo Project id to build the graph for.
 * @return {RGraph.HBar}                   the generated RGraph HBar graph for the Concerns
 */
var buildConcernsGraph = function(elemId, selectedProjectId) {
  if (!(elemId || selectedProjectId)) return;

  var concerns = Concerns.find({
    projectId: selectedProjectId,
    userId: Meteor.userId()
  }).fetch();

  // prepare the two arrays of data needed to generate the graph
  var completions = [];
  var names = [];
  concerns.forEach(function(concern) {
    names.push(concern.name);
    completions.push(concern.completion);
  });

  var hbarConcernsGraph = buildHbarGraph(elemId, completions, names);
  return hbarConcernsGraph;
};