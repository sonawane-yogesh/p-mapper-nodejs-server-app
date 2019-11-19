var {
    JobCardMaster
} = require("../model/index");

exports.demoFunc = function (request, response) {
    return response.send({
        'message': 'Test Response'
    });
};

