// var {GeneralSkillsMaster, GoalsMaster} = require("../model");
var {
    MemberReviewMaster
} = require("../model");
var mongoose = require("mongoose");

exports.addMemberReview = function (request, response) {
    var body = request.body;   
    MemberReviewMaster.create(body).then(r => {
        response.status(200).send(JSON.stringify(r));
    }).catch(err => {
        response.status(500).send(JSON.stringify(err));
    });
}

/*
exports.addMemberReview = function(request, response){
    var body = request.body;    
    var generalSkill = body.GeneralSkillMaster;
    var goals = body.GoalsMaster;   
    GeneralSkillsMaster.create(generalSkill).then(g => {
        GoalsMaster.create(goals).then(r =>{
            response.send(200).send(JSON.stringify("Record added successfully!!"));
        }).catch(error => {
            console.log(response.status(500).send(JSON.stringify(error)));
        });
    }).catch(err => {
        response.status(500).send(JSON.stringify(err));
    });  
}*/