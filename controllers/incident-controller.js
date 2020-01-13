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

module.exports = {
    addIncident,
    getIncidents
};