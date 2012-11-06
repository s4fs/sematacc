Template.kernel.userProjects = function () {
  return Projects.find({userId: this.userId});
};

 Template.kernel.concerns = function() {
  var projectId = Session.get('selectedProjectId');
  return Concerns.find({projectId : projectId});
 };

 Template.kernel.alphas = function(concernId) {
  var projectId = Session.get('selectedProjectId');
   return Alphas.find({
     concernId: concernId,
   });
 };

 Template.kernel.currentState = function(stateId) {
   var state = States.findOne({
     _id: stateId
   });
   if (state) return ': ' + state.name;
   else return '';
 };

 Template.kernel.states = function(alphaId) {
   if(alphaId) return States.find({
     alphaId: alphaId
   });
   else return States.find();
 };

 Template.kernel.sameId = function(firstId, secondId) {
   return firstId == secondId;
 };

 Template.kernel.checkable = function(alphaId) {
   if (alphaId == Session.get('selectedAlphaId')) return true;
   else return false;
 };

 var timeOut;
 Template.kernel.events({
  'click a#clearSelectedProjectId': function(event) {
      event.preventDefault();
      Session.set('selectedProjectId', null);
      Session.set('selectedProjectName', null);
   },
   'mouseenter .accordionlabel': function(event) {
    var concern = Concerns.findOne(this.concernId);
     $('#message').html(concern.name);
     $('.hints .hint').html(this.description).prepend('<span class="icon-check"></span>');
   },
   'mouseleave .accordionlabel': function(event) {
   },
   'mouseleave .ac-container': function(event) {
     $('#message').text('');
     $('.hints .hint').text('');
   },
   'click .accordionitem': function(event) {
     //TODO setting selectedAlphaId here makes the effect vanish
     $('input.accordionitem').attr('checked', false);
     $('#' + this._id).attr('checked', true);
   },
   'click li.selectable': function(event) {
     event.preventDefault();
     Session.set('selectedAlphaId', this.alphaId);
     Alphas.update({
       _id: this.alphaId
     }, {
       $set: {
         currentStateId: this._id
       }
     });
     updateAlphasCompletions();
     updateConcernCompletions();
   },
   'click li.item.selected': function(event) {  // a click on an already selected item removes it
     var alphaId = this.alphaId;
     Alphas.update({_id: alphaId}, {
       $set: {
         completion: 0,
         currentStateId: null
       }
     });
     updateConcernCompletions();
   },
   'mouseenter li.item.selected': function(event) {
    $(event.target).find('div').removeClass('icon-ok');
    $(event.target).find('div').addClass('icon-cancel');
   },
   'mouseleave li.item.selected': function(event) {
    $(event.target).find('div').removeClass('icon-cancel');
    $(event.target).find('div').addClass('icon-ok');
   },
   'mouseenter li.item.selectable': function(event){
    $(event.target).find('div').addClass('icon-ok');
   },
   'mouseleave li.item.selectable': function(event){
    $(event.target).find('div').removeClass('icon-ok');
   },
   'mouseenter li.item': function(event) {
     var description = this.description;
     $('.hints .hint').html(description);
     $('.hints .hint p br').after('<span class="icon-check"></span>');
     $('.hints .hint p').prepend('<span class="icon-check"></span>');
   },
   'mouseleave li.item': function(event) {
     $('.hints .hint').text();
   },

   'click a#openNewproject': function(event){
      event.preventDefault();
      $('.newproject').toggle('slow');
   },

   'click button#btnNewproject': function(event){
      event.preventDefault();
   },

   'mouseenter li.project': function(event){
      $('.description').toggle('slow');
   },

   'mouseleave li.project': function(event){
      $('.description').toggle('slow');
   }
 });
