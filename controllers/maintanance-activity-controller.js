var {
    MaintenanceActivity,
    MaintanaceChangePhase
} = require("../model/index");
var mongoose = require("mongoose");

var aggAll = async function (req, res) {
    // var r = await MaintenanceActivity.find();
    var r = await MaintenanceActivity.aggregate([]).exec();
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
    var res = await MaintenanceActivity.find({
        CurrentPhase: {
            $in: ["Execution", "Planning"]
        }
    });
    response.send(res);
};

var updateActivity = function (request, response) {
    var reqBody = request.body;
    id = reqBody.id;
    var mainChangePhase = {
        MaintanaceActivityId: id,
        CreatedBy: reqBody.UpdatedBy,
        CurrentPhase: reqBody.CurrentPhase,
        ImpactedApps: reqBody.ImpactedApps,
        DevelopmentTeam: reqBody.DevelopmentTeam,
        StakeholderTeam: reqBody.StakeholderTeam
    }
    MaintenanceActivity.findByIdAndUpdate({
        _id: id
    }, reqBody, {
        upsert: true,
        returnNewDocument: true
    }, function (err, doc) {
        if (err) {
            response.status(500).send('Error While Updating Card')
        } else {
            MaintanaceChangePhase.create(mainChangePhase).then((d) => {
                console.log(d);
            }).catch((err) => {
                console.log(err);
            });
            response.send(doc);
        }
    });
};

var getMaintanaceChangePhase = async function (request, response) {
    var body = request.body;
    // var maintanaceChangePhase = [];
    let arr = body.map(ele => new mongoose.Types.ObjectId(ele.ProjectId));
    // var changePhase = await MaintanaceChangePhase.where("MaintanaceActivityId").in(arr);

    var changePhase = await MaintanaceChangePhase.aggregate([{
            $match: {
                "MaintanaceActivityId": {
                    $in: arr
                }
            }
        }]).exec();

    response.send(changePhase);
};

var getChangePhaseById = async function (request, response) {
    var id = new mongoose.Types.ObjectId(request.query.id);
    var changePhase = await MaintanaceChangePhase.aggregate([{
            $match: {
                "_id": {
                    $in: [id]
                }
            }
        }])
        .exec();
    response.json(changePhase);
};
module.exports = {
    addActivity,
    aggAll,
    getActivities,
    updateActivity,
    getMaintanaceChangePhase,
    getChangePhaseById

};