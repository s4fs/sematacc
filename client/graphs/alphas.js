/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * Build a generic Rose Graph
 * @param  {string} elemId    the target element Id where the graph will be
 * @param  {[number]} data      the data to be represented
 * @param  {[string]} labels    the corresponding labels for the data elements
 * @param  {[type]} meteorIds  Id to open the elements on graph clicks.
 * @return {RGraph.Rose}           The generated RGraph Rose graph
 */
var buildRoseGraph = function(elemId, data, labels, meteorIds) {
    if (!(elemId || data || labels)) return;
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
    roseGraph.Set('chart.colors', [grad]);
    roseGraph.Set('chart.margin', 5);
    roseGraph.Set('chart.ymax', 100);
    roseGraph.Set('contextmenu', [
        ['Get PNG',
            function() {
                RGraph.showPNG();
                $('div#__rgraph_image_div__').addClass('onTop');
            }
        ],
        null, ['Cancel',
            function() {}
        ]
    ]);
    roseGraph.meteorIds = meteorIds;

    return roseGraph;
};

/**
 * Build a Rose Graph representing the Alphas completion
 * @param  {string} elemId            the target element ID to contain the graph.
 * @param  {string} selectedProjectId the Meteor/Mongo Project id to build the graph for.
 * @return {RGraph.Rose}                   the generated RGraph Rose graph for the Alphas.
 */
buildAlphasGraph = function(elemId, selectedProjectId) {
    if (!(elemId || selectedProjectId)) return;

    var project = Projects.findOne({
        _id: selectedProjectId
    });

    if (!project)
        return;

    var alphas = [];
    for (var c in project.kernel.concerns) {
        for (var a in project.kernel.concerns[c].alphas)
            alphas.push(project.kernel.concerns[c].alphas[a]);
    }

    // prepare the 3 arrays of data needed for building the graph
    var data = [];
    var labels = [];
    var meteorIds = [];
    alphas.forEach(function(alpha) {
        data.push(alpha.completion);
        labels.push(alpha.name);
        meteorIds.push(alpha.domId);
    });

    var roseAlphaGraph = buildRoseGraph(elemId, data, labels, meteorIds);

    // attach to the RGraph onclick events a function to open the corresponding Alpha.
    roseAlphaGraph.onclick = function(e, shape) {
        id = roseAlphaGraph.meteorIds[shape[6]];
        $('input.accordionitem').attr('checked', false);
        $('#' + id).click();
    };
    roseAlphaGraph.onmousemove = function(e, shape) {
        e.target.style.cursor = 'pointer';
    };

    return roseAlphaGraph;
};