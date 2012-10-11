/**
 * Chart utilities
 */
if (Meteor.isClient) {

  function draw_graph(elem_id) {
    if (elem_id == null)
      elem_id = 'graph';

    var graph = build_graph_alphas(elem_id);
    RGraph.Clear(graph.canvas);
    graph.Draw();
  }

  function build_graph_alphas(elem_id) {
    if (elem_id == null)
      elem_id = 'graph';

    var alphas = Alphas.find({}).fetch();
    var data = [];
    var labels = [];

    alphas.forEach(function(alpha) {
      data.push(alpha.completion);
      labels.push(alpha.name);
    });

    return build_graph(elem_id, data, labels);
  }

  function build_graph(elem_id, data, labels) {
    var rose_graph = new RGraph.Rose(elem_id, data);
    rose_graph.Set('chart.colors.alpha', 0.6);
    rose_graph.Set('chart.labels', labels);
    rose_graph.Set('chart.tooltips', '');
    rose_graph.Set('chart.labels.axes', '');
    rose_graph.Set('chart.background.grid.spokes', labels.length * 4);
    rose_graph.Set('chart.background.axes', false);
    rose_graph.Set('chart.colors.sequential', true);
    rose_graph.Set('chart.margin', 0);
    return rose_graph;
  }
}