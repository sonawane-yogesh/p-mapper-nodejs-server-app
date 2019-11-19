var {
    JobCardMaster,
    UserMaster,
    ApplicationCardMaster
} = require("../model/index");


module.exports.dashBoardCounts = async function (request, response) {
    var dashBoard = [];
    await JobCardMaster.count().then((job) => {
        dashBoard.push({
            title: "Job Cards",
            count: job
        });
    }).catch((err) => {
        console.log(err);
    });
    await ApplicationCardMaster.count().then((app) => {
        dashBoard.push({
            title: "Application Cards",
            count: app
        });
    }).catch((err) => {
        console.log(err);
    });
    await UserMaster.count().then((member) => {
        dashBoard.push({
            title: "Members",
            count: member
        });
    }).catch((err) => {
        console.log(err);
    });
    response.send(dashBoard);
}