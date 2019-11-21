var {
    JobCardMaster,
    UserMaster,
    ApplicationCardMaster,
    MaintenanceActivity
} = require("../model/index");
var mongoose = require("mongoose");

module.exports.dashBoardCounts = async function (request, response) {
    var dashBoard = [];
    var job = await JobCardMaster.countDocuments();
    dashBoard.push({
        title: "Job Cards",
        count: job
    });

    var app = await ApplicationCardMaster.countDocuments();
    dashBoard.push({
        title: "Application Cards",
        count: app
    });
    await UserMaster.countDocuments().then((member) => {
        dashBoard.push({
            title: "Members",
            count: member
        });
    }).catch((err) => {
        console.log(err);
    });
    response.send(dashBoard);
};

module.exports.getDistinctApplication = async function (request, response) {
    var application = [];
    var result = await ApplicationCardMaster.aggregate([{
        $group: {
            _id: "$ServerName"
        }
    }]).exec();
    for (let app of result) {
        var appCount = await ApplicationCardMaster.countDocuments({
            ServerName: app._id
        });
        application.push({
            "ServerName": app._id,
            "Count": appCount
        });
    }
    response.send(application);
};

module.exports.getRoleBasedApps = async function (request, response) {
    var userId = new mongoose.Types.ObjectId(request.query.id);
    var members = await UserMaster.find({
        $or: [{
            _id: userId
        }, {
            ReportToId: userId
        }]
    }).exec();
    var id = members.map(m => m._id);
    var projects = await MaintenanceActivity.aggregate([{
        $match: {
            $or: [{
                CreatedBy: id
            }, {
                DevelopmentTeam: {
                    $in: id
                }
            }, {
                StakeholderTeam: {
                    $in: id
                }
            }]
        }
    }]).exec();

    response.send(projects);
};