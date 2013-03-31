/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * Chart utilities.
 */

var resizeGraphDivs = function() {
  graphsW = $('.graphs').width();
  graphsH = $('.graphs').width();
  $('canvas#graphRoseAlphas').attr('width', graphsW - 20);
  $('canvas#graphRoseAlphas').attr('height', graphsH / 1.618);

  $('canvas#graphHbarOverall').attr('width', graphsW - 20);
  $('canvas#graphHbarOverall').attr('height', (graphsH - (graphsH / 1.618)));
};

$(window).resize(function() {
  drawGraphs();
});

var buildRoseGraph = function(elemId, data, labels, meteorIds) {
  var roseGraph = new RGraph.Rose(elemId, data);

  var halfWidth = $('canvas#' + elemId).attr('width') / 2;
  var halfHeight = $('canvas#' + elemId).attr('height') / 2;

  var gradientCenterX = halfWidth;
  var gradientCenterY = halfHeight;
  var grad = roseGraph.context.createRadialGradient(gradientCenterX, gradientCenterY, 0, halfWidth, halfHeight, halfWidth);
  grad.addColorStop(0, '#CE5F54');
  grad.addColorStop(0.25, '#FFFFE5');
  grad.addColorStop(0.35, '#FFFFE5');
  grad.addColorStop(0.55, '#63994C');
  roseGraph.Set('chart.labels', labels);
  roseGraph.Set('chart.labels.axes', '');
  roseGraph.Set('chart.background.grid.spokes', data.length * 2);
  roseGraph.Set('chart.background.axes', false);
  //roseGraph.Set('chart.colors', ['#7DB4B5']);
  roseGraph.Set('chart.colors', [grad]);
  roseGraph.Set('chart.margin', 5);
  roseGraph.Set('chart.ymax', 100);
  roseGraph.meteorIds = meteorIds;
  return roseGraph;
};

var buildHbarGraph = function(elemId, data, labels, meteorIds) {
  var hbar = new RGraph.HBar(elemId, data);

  // Configure the chart to appear as wished.
  var grad = hbar.context.createLinearGradient(0, 0, hbar.canvas.width, 0);
  grad.addColorStop(0, '#CE5F54');
  grad.addColorStop(0.60, '#FFFFE5');
  grad.addColorStop(1, '#63994C');
  hbar.Set('chart.labels', labels);
  hbar.Set('chart.gutter.left', 90);
  hbar.Set('chart.background.barcolor1', 'white');
  hbar.Set('chart.background.barcolor2', 'white');
  hbar.Set('chart.background.grid', false);
  //hbar.Set('chart.colors', ['#7DB4B5']);
  hbar.Set('chart.colors', [grad]);
  hbar.Set('chart.xmax', 100);
  return hbar;

};

var buildRoseAlphasGraph = function(elemId, selectedProjectId) {
  if (elemId === null) return;

  var alphas = Alphas.find({
    projectId: selectedProjectId,
    userId: Meteor.userId()
  }).fetch();
  var data = [];
  var labels = [];
  var meteorIds = [];

  //TODO refactor
  alphas.forEach(function(alpha) {
    data.push(alpha.completion);
    labels.push(alpha.name);
    meteorIds.push(alpha._id);
  });

  var roseAlphaGraph = buildRoseGraph(elemId, data, labels, meteorIds);
  // RGraph events
  roseAlphaGraph.onclick = function(e, shape) {
    id = roseAlphaGraph.meteorIds[shape[6]];
    $('input.accordionitem').attr('checked', false);
    $('#' + id).attr('checked', true);
  };
  roseAlphaGraph.onmousemove = function(e, shape) {
    e.target.style.cursor = 'pointer';
  };

  return roseAlphaGraph;
};


var buildHbarOverallGraph = function(elemId, selectedProjectId) {
  if (elemId === null) return;
  var concerns = Concerns.find({
    projectId: selectedProjectId,
    userId: Meteor.userId()
  }).fetch();
  var completions = [];
  var names = [];
  concerns.forEach(function(concern) {
    names.push(concern.name);
    completions.push(concern.completion);
  });
  var hbarOverallGraph = buildHbarGraph(elemId, completions, names, null);
  return hbarOverallGraph;
};

/**
 * Draw the graphs for the current project
 */
var drawGraphs = function(selectedProjectId) {
  if (!selectedProjectId) selectedProjectId = Session.get('selectedProjectId');

  if (!selectedProjectId) return;

  resizeGraphDivs();
  graphIds = ['graphRoseAlphas', 'graphHbarOverall'];

  RGraph.ObjectRegistry.Clear();
  var roseGraph = buildRoseAlphasGraph(graphIds[0], selectedProjectId);
  var hbarGraph = buildHbarOverallGraph(graphIds[1], selectedProjectId);

  RGraph.Clear(roseGraph.canvas);
  RGraph.Clear(hbarGraph.canvas);

  RGraph.Effects.Rose.Grow(roseGraph, null, null);
  RGraph.Effects.HBar.Grow(hbarGraph, null, null);
};