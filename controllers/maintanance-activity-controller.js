var {
    MaintananceActivity
} = require("../model/index");

var aggAll = async function (req, res) {
    var r = await MaintananceActivity.find();
    // var r = await MaintananceActivity.aggregate().exec();
    res.json(r);
};

var addActivity = function (request, response) {
    var reqBody = request.body;
    var activity = new MaintananceActivity(reqBody);

    activity.save().then((result) => {
        response.send(result);
    }).catch((err) => {
        response.status(500).send(err);
    });
};

module.exports = {
    addActivity,
    aggAll
}