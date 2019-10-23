var {
    SystemMember
} = require('../model/index');
var addMembers = function (request, response) {
    var reqBody = request.body;
    var memberDetails = new SystemMember({
        MemberId: reqBody.MemberId,
        MemberName: reqBody.MemberName,
        Email: reqBody.Email,
        AltEmail: reqBody.AltEmail,
        Phone1: reqBody.Phone1,
        Phone2: reqBody.Phone2,
        Phone3: reqBody.Phone3,
        SmsPhone: reqBody.SmsPhone,
        ContactType: reqBody.ContactType
    });

    memberDetails.save().then((result) => {
        response.send(result);
    }).catch((err) => {
        response.status(500).send(err);
    });
};


var getAllMembers = async function (request, response) {
    var members = await SystemMember.find();
    response.send(members);
};
module.exports = {
    addMembers,
    getAllMembers
}