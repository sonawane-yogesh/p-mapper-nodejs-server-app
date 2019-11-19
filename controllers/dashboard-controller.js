var {
    JobCardMaster,
    UserMaster,
    ApplicationCardMaster
} = require("../model/index");


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