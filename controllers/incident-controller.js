const {
    IncidentMaster
} = require('../model/incident-master');

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
    var incidents = await IncidentMaster.find();
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

module.exports = {
    addIncident,
    getIncidents,
    updateIncident
};