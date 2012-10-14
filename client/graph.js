/**
 * Chart utilities
 */
if (Meteor.isClient) {

 
  function draw_graph(elem_id) {
    if (elem_id == null)
      elem_id = 'graph';

    RGraph.ObjectRegistry.Clear() 
    var graph = build_graph_alphas(elem_id);
    RGraph.Clear(graph.canvas);

    RGraph.Effects.Rose.Grow(graph, null, null);
  }

  function build_graph_alphas(elem_id) {
    if (elem_id == null)
      elem_id = 'graph';

    var alphas = Alphas.find({}).fetch();
    var data = [];
    var labels = [];
    var meteor_ids = [];

    alphas.forEach(function(alpha) {
      data.push(alpha.completion);
      labels.push(alpha.name);
      meteor_ids.push(alpha._id);
    });

    return build_graph(elem_id, data, labels, meteor_ids);
  }

  function build_graph(elem_id, data, labels, meteor_ids) {
    var rose_graph = new RGraph.Rose(elem_id, data);
    rose_graph.Set('chart.colors.alpha', 0.6);
    rose_graph.Set('chart.labels', labels);
    rose_graph.Set('chart.tooltips', '');
    rose_graph.Set('chart.labels.axes', '');
    rose_graph.Set('chart.background.grid.spokes', labels.length * 2);
    rose_graph.Set('chart.background.axes', false);
    rose_graph.Set('chart.colors.sequential', true);
    rose_graph.Set('chart.margin', 5);
    rose_graph.ids = meteor_ids;
    return rose_graph;
  }
}