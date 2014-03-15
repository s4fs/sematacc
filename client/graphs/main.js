/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */


/**
 * Chart utilities.
 */

resizeGraphDivs = function() {
    graphsW = $('.graphs').width();
    graphsH = $('.graphs').width();
    $('canvas#graphRoseAlphas').attr('width', graphsW - 20);
    $('canvas#graphRoseAlphas').attr('height', graphsH / 1.618);
    $('canvas#graphHbarOverall').attr('width', graphsW - 20);
    $('canvas#graphHbarOverall').attr('height', (graphsH - (graphsH / 1.618)));
};


/**
 * Draw the graphs for the current project
 */
drawGraphs = function() {
    selectedProjectId = Session.get('selectedProjectId');
    if (!selectedProjectId)
        return;

    resizeGraphDivs();
    graphIds = ['graphRoseAlphas', 'graphHbarOverall'];

    RGraph.ObjectRegistry.Clear();
    var roseGraph = buildAlphasGraph(graphIds[0], selectedProjectId);
    var hbarGraph = buildConcernsGraph(graphIds[1], selectedProjectId);

    RGraph.Clear(roseGraph.canvas);
    RGraph.Clear(hbarGraph.canvas);

    RGraph.Effects.Rose.Grow(roseGraph, null, null);
    RGraph.Effects.HBar.Grow(hbarGraph, null, null);
};

