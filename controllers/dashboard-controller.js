var {
    JobCardMaster,
    UserMaster,
    ApplicationCardMaster
} = require("../model/index");


module.exports.dashBoardCounts = async function (request, response) {
    var dashBoard = [];
    var job = await JobCardMaster.count();
    dashBoard.push({
        title: "Job Cards",
        count: job
    });

    var app = await ApplicationCardMaster.count();
    dashBoard.push({
        title: "Application Cards",
        count: app
    });

    var user = await UserMaster.count();
    dashBoard.push({
        title: "Members",
        count: user
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
        var appCount = await ApplicationCardMaster.count({
            ServerName: app._id
        });
        application.push({
            "ServerName": app._id,
            "Count": appCount
        });
    }
    response.send(application);
}