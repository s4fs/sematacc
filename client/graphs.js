/**
 * Chart utilities
 */
if(Meteor.isClient) {

  function build_rose_graph(elem_id, data, labels, meteor_ids) {
    var rose_graph = new RGraph.Rose(elem_id, data);
    rose_graph.Set('chart.colors.alpha', 0.6);
    rose_graph.Set('chart.labels', labels);
    rose_graph.Set('chart.labels.axes', '');
    rose_graph.Set('chart.background.grid.spokes', labels.length * 2);
    rose_graph.Set('chart.background.axes', false);
    //rose_graph.Set('chart.colors.sequential', true);
    rose_graph.Set('chart.colors', ['#7DB4B5']);
    rose_graph.Set('chart.margin', 5);
    rose_graph.meteor_ids = meteor_ids;
    return rose_graph;
  }

  function build_hbar_graph(elem_id, data, labels, meteor_ids) {
    var hbar = new RGraph.HBar(elem_id, data);
    // Configure the chart to appear as wished.
    hbar.Set('chart.labels', labels);
    hbar.Set('chart.gutter.left', 90);
    hbar.Set('chart.background.barcolor1', 'white');
    hbar.Set('chart.background.barcolor2', 'white');
    hbar.Set('chart.background.grid', false);
    hbar.Set('chart.colors', ['#7DB4B5']);
    hbar.Set('chart.xmax', 100);
    return hbar;
  }

  function build_rose_alphas_graph(elem_id) {
    if(elem_id == null) elem_id = 'graph_rose_alphas';

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
      Session.set("selected_alpha_id", id);
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
    
    graph_ids = ['graph_rose_alphas', 'graph_hbar_overall'];

    RGraph.ObjectRegistry.Clear();
    var rose_graph = build_rose_alphas_graph(graph_ids[0]);
    var hbar_graph = build_hbar_overall_graph(graph_ids[1]);

    RGraph.Clear(rose_graph.canvas);
    RGraph.Clear(hbar_graph.canvas);

    RGraph.Effects.Rose.Grow(rose_graph, null, null);
    RGraph.Effects.HBar.Grow(hbar_graph, null, null);
  }

}