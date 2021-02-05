// var {GeneralSkillsMaster, GoalsMaster} = require("../model");
var {
    MemberReviewMaster,
    GoalsMaster
} = require("../model");
var mongoose = require("mongoose");

var addMemberReview = function (request, response) {
    var body = request.body;
    MemberReviewMaster.create(body).then(r => {
        response.status(200).send(JSON.stringify(r));
    }).catch(err => {
        response.status(500).send(JSON.stringify(err));
    });
};
var getMemberReviewById = async function (request, response) {
    var id = request.query.id;
    var res = await MemberReviewMaster.find({
        MemberId: id
    });
    // var res1 = await MemberReviewMaster.aggregate().exec();
    response.send(res);
};

var deleteGoalById = function (request, response) {
    var id = request.query.id;
    MemberReviewMaster.updateOne({
        "GoalsMaster._id": mongoose.Types.ObjectId(id)
    }, {
        $pull: {
            "GoalsMaster": {
                _id: mongoose.Types.ObjectId(id)
            }
        }
    }, {
        multi: true
    }, (err, res) => {
        if (err)
            response.send(err);
        else
            response.send(res);
    });
};

var deleteSkillById = function (request, response) {
    var id = request.query.id;
    MemberReviewMaster.updateOne({
        "TechSkillMaster._id": mongoose.Types.ObjectId(id)
    }, {
        $pull: {
            "TechSkillMaster": {
                _id: mongoose.Types.ObjectId(id)
            }
        }
    }, {
        multi: true
    }, (err, res) => {
        if (err)
            response.send(err);
        else
            response.send(res);
    });
    // console.log('requested id is ', id);
};
module.exports = {
    addMemberReview,
    getMemberReviewById,
    deleteGoalById,
    deleteSkillById
};
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