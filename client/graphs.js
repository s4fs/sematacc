/**
 * Chart utilities
 */
var resize_graph_divs = function() {
    graphs_w = $('.graphs').width();
    rose_w = graphs_w;
    hbar_w = graphs_w;
    $('#graph_rose_alphas').width(rose_w);
    $('#graph_rose_alphas').height(rose_w / 1.618);
    $('#graph_hbar_overall').width(hbar_w);
    $('#graph_rose_alphas').height(hbar_w / 1.618);
  };

Template.graph.rendered = function() {
  resize_graph_divs();
};

$(window).resize(function() {
  resize_graph_divs();
});

function build_rose_graph(elem_id, data, labels, meteor_ids) {
  var rose_graph = new RGraph.Rose(elem_id, data);
  var halfWidth = rose_graph.canvas.width / 2;
  var halfHeight = rose_graph.canvas.height / 2;
  var gradientCenterX = halfWidth;
  var gradientCenterY = halfHeight;
  var grad = rose_graph.context.createRadialGradient(gradientCenterX, gradientCenterY, 0, halfWidth, halfHeight, halfWidth);
  grad.addColorStop(0.1, '#BB2828');
  grad.addColorStop(0.25, '#BBB628');
  grad.addColorStop(0.55, '#5EBC41');
  rose_graph.Set('chart.labels', labels);
  rose_graph.Set('chart.labels.axes', '');
  rose_graph.Set('chart.background.grid.spokes', data.length * 2);
  rose_graph.Set('chart.background.axes', false);
  //rose_graph.Set('chart.colors', ['#7DB4B5']);
  rose_graph.Set('chart.colors', [grad]);
  rose_graph.Set('chart.margin', 5);
  rose_graph.Set('chart.ymax', 100);
  rose_graph.meteor_ids = meteor_ids;
  return rose_graph;
}

function build_hbar_graph(elem_id, data, labels, meteor_ids) {
  var hbar = new RGraph.HBar(elem_id, data);

  // Configure the chart to appear as wished.
  var grad = hbar.context.createLinearGradient(0, 0, hbar.canvas.width, 0);
  grad.addColorStop(0, '#BB2828');
  grad.addColorStop(0.2, '#BB2828');
  grad.addColorStop(0.5, '#BBB628');
  grad.addColorStop(0.9, '#5EBC41');
  grad.addColorStop(1, '#5EBC41');
  hbar.Set('chart.labels', labels);
  hbar.Set('chart.gutter.left', 90);
  hbar.Set('chart.background.barcolor1', 'white');
  hbar.Set('chart.background.barcolor2', 'white');
  hbar.Set('chart.background.grid', false);
  //hbar.Set('chart.colors', ['#7DB4B5']);
  hbar.Set('chart.colors', [grad]);
  hbar.Set('chart.xmax', 100);
  return hbar;

}

function build_rose_alphas_graph(elem_id) {
  if (elem_id == null) elem_id = 'graph_rose_alphas';

  var alphas = Alphas.find({}).fetch();
  var data = [];
  var labels = [];
  var meteor_ids = [];

  //TODO refactor
  alphas.forEach(function(alpha) {
    data.push(alpha.completion);
    labels.push(alpha.name);
    meteor_ids.push(alpha._id);
  });

  var rose_alpha_graph = build_rose_graph(elem_id, data, labels, meteor_ids);
  rose_alpha_graph.onclick = function(e, shape) {
    id = rose_alpha_graph.meteor_ids[shape[6]];
    //Session.set("selected_alpha_id", id);
    $("input.accordionitem").attr("checked", false);
    $("#" + id).attr("checked", true);
  };
  rose_alpha_graph.onmousemove = function(e, shape) {
    e.target.style.cursor = 'pointer';
  };

  return rose_alpha_graph;
}

function build_hbar_overall_graph(elem_id) {
  if (elem_id == null) elem_id = 'graph_hbar_overall';
  var concerns = Concerns.find({}).fetch();
  var completions = [];
  var names = [];
  concerns.forEach(function(concern) {
    names.push(concern.name);
    completions.push(concern.completion);
  });
  var hbar_overall_graph = build_hbar_graph(elem_id, completions, names, null);
  return hbar_overall_graph;

}



function draw_graphs() {
  resize_graph_divs();
  graph_ids = ['graph_rose_alphas', 'graph_hbar_overall'];

  RGraph.ObjectRegistry.Clear();
  var rose_graph = build_rose_alphas_graph(graph_ids[0]);
  var hbar_graph = build_hbar_overall_graph(graph_ids[1]);

  RGraph.Clear(rose_graph.canvas);
  RGraph.Clear(hbar_graph.canvas);

  RGraph.Effects.Rose.Grow(rose_graph, null, null);
  RGraph.Effects.HBar.Grow(hbar_graph, null, null);
}