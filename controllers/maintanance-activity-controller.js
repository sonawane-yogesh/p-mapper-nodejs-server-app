var {
    MaintenanceActivity
} = require("../model/index");

var aggAll = async function (req, res) {
    // var r = await MaintenanceActivity.find();
    var r = await MaintenanceActivity.aggregate().exec();
    res.json(r);
};

var addActivity = function (request, response) {
    var reqBody = request.body;
    var activity = new MaintenanceActivity(reqBody);

    activity.save().then((result) => {
        response.send(result);
    }).catch((err) => {
        response.status(500).send(err);
    });
};

var getActivities = async function (request, response) {
    var res = await MaintenanceActivity.find();
    response.send(res);
};

var updateActivity = function (request, response) {
    var reqBody = request.body;
    id = reqBody.id;

    MaintenanceActivity.findByIdAndUpdate({
        _id: id
    }, reqBody, {
        upsert: true,
        returnNewDocument: true
    }, function (err, doc) {
        if (err) {
            response.status(500).send('Error While Updating Card')
        } else {
            response.send(doc);
        }
    });
};
module.exports = {
    addActivity,
    aggAll,
    getActivities,
    updateActivity
}