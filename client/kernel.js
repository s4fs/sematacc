 Template.kernel.concerns = function() {
   return Concerns.find();
 };

 Template.kernel.alphas = function(concern_id) {
   return Alphas.find({
     concern_id: concern_id
   });
 };

 Template.kernel.current_state = function(state_id) {
   var state = States.findOne({
     _id: state_id
   });
   if(state) return ": " + state.name;
   else return "";
 };

 Template.kernel.states = function(alpha_id) {
   if(alpha_id) return States.find({
     alpha_id: alpha_id
   });
   else return States.find();
 };

 Template.kernel.same_id = function(first_id, second_id) {
   return first_id == second_id;
 };

 Template.kernel.checkable = function(alpha_id) {
   if(alpha_id == Session.get("selected_alpha_id")) return true;
   else return false;
 };

 var time_out;
 Template.kernel.events({
   "mouseenter .accordionlabel": function(event) {
    var concern = Concerns.findOne(this.concern_id);
     $('#message').html(concern.name);
     $(".hints .hint").html(this.description);
   },
   "mouseleave .ac-container": function(event) {
     $('#message').text("");
     $(".hints .hint").text("");
   },
   'click .accordionitem': function(event) {
     //TODO setting selected_alpha_id here makes the effect vanish
     $("input.accordionitem").attr("checked", false);
     $("#" + this._id).attr("checked", true);
     //if (time_out) {
     //  window.clearTimeout(time_out);
     //}
   },
   'click li.selectable': function(event) {
     event.preventDefault();
     Session.set("selected_alpha_id", this.alpha_id);
     Alphas.update({
       _id: this.alpha_id
     }, {
       $set: {
         current_state_id: this._id
       }
     });
     update_alphas_completions();
     update_concern_completions();
   },
   'click li.item.selected': function(event) {  // a click on an already selected item removes it
     var alpha_id = this.alpha_id;
     Alphas.update({_id: alpha_id}, {
       $set: {
         completion: 0,
         current_state_id: null
       }
     });
     update_concern_completions();
   },
   'mouseenter li.item.selected': function(event) {
     $(event.target).find('div').html("&#10008;");
   },
   'mouseleave li.item.selected': function(event) {
     $(event.target).find('div').html("&#10004;");
   },
   'mouseenter li.item': function(event) {
     var description = this.description;
     //time_out = window.setTimeout(function() {
     $(".hints .hint").html(description);
     //}, 1000);
   },
   'mouseleave li.item': function(event) {
     /*if (time_out) {
       window.clearTimeout(time_out);
     }*/
     $(".hints .hint").text();
   }
 });
