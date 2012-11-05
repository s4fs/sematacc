Template.dashboard.user_projects = function () {
  return Projects.find({user_id: this.userId});
};

 Template.dashboard.events({
   'click a#open_newproject': function(event){
      event.preventDefault();
      $(".newproject").toggle("slow");
   },

   'click button#btn_newproject': function(event){
      event.preventDefault();
   },


   'mouseenter li.project': function(event){
      $(".description").toggle("slow");
   },

   'mouseleave li.project': function(event){
      $(".description").toggle("slow");
   }
 });
