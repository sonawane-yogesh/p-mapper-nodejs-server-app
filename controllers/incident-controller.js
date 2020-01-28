const {
    IncidentMaster
} = require('../model/incident-master');
const { IncidentStatuses } = require('../model/incident-statuses');
const { UserMaster } = require('../model/user-master');
const mongoose = require('mongoose');

var addIncident = function (request, response) {
    var reqBody = request.body;
    var incident = new IncidentMaster(reqBody);
    incident.save().then((result) => {
        response.status(200).send(result);
    }).catch((e) => {
        response.status(500).send(e);
    });
};

var getIncidents = async function (request, response) {
    var incidents = await IncidentMaster.find({}, null, { sort: { CreatedOn: -1 } }).lean();
    // var incidents = await IncidentMaster.find({});
    response.send(incidents);
};

var updateIncident = function (request, response) {
    var reqBody = request.body;
    IncidentMaster.findByIdAndUpdate({
        _id: reqBody.id
    }, reqBody, {
        upsert: true,
        returnNewDocument: true
    }, function (err, doc) {
        if (err)
            response.status(500).send(err);
        else
            response.send(doc);
    });
};

var updateStatus = function (request, response) {
    var reqBody = request.body;
    IncidentStatuses.create(reqBody).then((res) => {
        IncidentMaster.updateOne({ _id: reqBody.id }, {
            $currentDate: {
                'UpdatedOn': { $type: "date" }
            }
        }, function (err, result) {
            if (err)
                response.status(500).send(err);
            else
                response.send(result);
        });
    }).catch((err) => {
        response.status(500).send(err);
    });
};

var getStatusReport = async function (request, response) {
    var result = await IncidentStatuses.find();
    response.send(result);
};

var testIncidentResult = async function (request, response) {
    var loggedId = request.query.id;
    var incidents = await IncidentMaster.find({}).lean();
    var temp = [];
    for (let val of incidents) {
        var resources = [];
        val.Resources.forEach(r => {
            resources.push(r);
        });
        var incRes = await UserMaster.find({
            _id: {
                $in: resources
            }
        }).lean();

        var allReportTo = [];
        incRes.forEach(function (re) {
            allReportTo.push(re._id.toString());
            if (!re.ReportToId) return;
            allReportTo.push(re.ReportToId.toString());
        });
        var isPresent = allReportTo.includes(loggedId);
        var result = await IncidentStatuses.findOne({ IncidentId: mongoose.Types.ObjectId(val._id) },
            ['CurrentStatus', 'StatusNotes', "UpdatedBy"], { sort: { "UpdatedOn": -1 } });

        if (!result) {
            var user = await UserMaster.findOne({ _id: val.CreatedBy });
            val.CreatedByUser = `${user.FirstName} ${user.LastName}`;
            val.ShowReportBtn = isPresent;
            temp.push(val);
        } else {
            var user = await UserMaster.findOne({ _id: result.UpdatedBy });
            val.UpdatedByUser = `${user.FirstName} ${user.LastName}`;
            val.CurrentStatus = result.CurrentStatus;
            val.ShowReportBtn = isPresent;
            temp.push(val);
        }
    };

    response.send(temp);
};

module.exports = {
    addIncident,
    getIncidents,
    updateIncident,
    updateStatus,
    getStatusReport,
    testIncidentResult
};
