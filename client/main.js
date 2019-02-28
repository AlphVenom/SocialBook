import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.profile.helpers({
	profAll(){
		return userDB.find({});
	}
});

Template.profile.events({
	'click .js-delete'(event, instance){
		var profId = this._id;
		$("#" + profId).fadeOut("slow", "swing", function () {
			userDB.remove({_id: profId});
		});
	},

    'click .js-like'(event, instance) {
      console.log("You clicked Like");
      var profID = this._id;
      var numLikes = userDB.findOne({_id: profID}).like;
      if (!numLikes){
      	numLikes = 0;
      	
    }  	
      numLikes = numLikes + 1;	
      console.log("You have",numLikes);
      userDB.update({_id:profID}, {$set:{'like':numLikes}});
    },

    'click .js-dislike'(event, instance) {
      console.log("You clicked dislike");
      var ProFid = this._id;
      var numdisLikes = userDB.findOne({_id: ProFid}).dislike;
      if (!numdisLikes){
      	numdisLikes = 0;
      }

    numdisLikes = numdisLikes + 1;
    console.log("You have", numdisLikes);
    userDB.update({_id:ProFid}, {$set:{'dislike':numdisLikes}});
    },
    
    'click .js-profileedit'(event, instance) {
    $("#editmodal").modal('show');
    var uId = this._id;
	$("#userId").val(uId);
	$('#viewUserProfile img').attr('src',userDB.findOne({_id:uId}).img);
	},
});

Template.addUser.events({
	'click .js-saveProfile'(event, instance){
		//get user data
	var fName = $("#addUserModal input[name='firstName']").val();
	var lName = $("#addUserModal input[name='lastName']").val();
	var image = $("#addUserModal input[name='image']").val();
	if (image == ""){
		image="giphy.gif";
	}	
	console.log("The first name is", fName);
	console.log("The last name is", lName);
	console.log("The image is", image);
		//Reset the form
	$("#addUserModal input[name='firstName']").val('');
	$("#addUserModal input[name='lastName']").val('');
	$("#addUserModal input[name='image']").val('');
		//Close the modal
	$("#addUserModal").modal("hide");
	userDB.insert({'firstName':fName, 'lastName':lName, 'img':image});	

	
 }
});





