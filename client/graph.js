/**
 * Chart utilities
 */
if (Meteor.isClient) {

  function graph_alphas(elem_id) {
    if (elem_id == null)
      elem_id = 'graph';
    var alphas = Alphas.find({}).fetch();
    Meteor._debug(alphas);
    var data = [];
    var labels = [];
    alphas.forEach(function(alpha) {
      data.push(alpha.completion);
      labels.push(alpha.name);
    });
    graph(elem_id, data, labels);
  }

  function graph(elem_id, data, labels) {
    var rose2 = new RGraph.Rose(elem_id, data);
    rose2.Set('chart.colors.alpha', 0.5);
    rose2.Set('chart.labels', labels);
    rose2.Set('chart.tooltips', labels);
    rose2.Set('chart.labels.axes', '');
    rose2.Set('chart.background.grid.spokes', 8);
    rose2.Set('chart.background.axes', false);
    rose2.Set('chart.colors.sequential', true);
    rose2.Set('chart.margin', 2);
    rose2.Set('chart.resizable', true);
    rose2.Draw();
  }
}