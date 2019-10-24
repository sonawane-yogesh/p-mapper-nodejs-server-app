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
    var members = {
        developers: [],
        others: [],
        allMembers: []
    };
    var devList = await SystemMember.find({
        ContactType: "Developer"
    });
    for (let dev of devList) {
        members.developers.push(dev);
    }
    var allmembers = await SystemMember.find();
    for (let member of allmembers) {
        members.allMembers.push(member);
    }
    var nonDevs = await SystemMember.find({
        ContactType: {
            $not: RegExp("Developer")
        }
    });
    for (let n of nonDevs) {
        members.others.push(n);
    }
    response.send(members);
};

module.exports = {
    addMembers,
    getAllMembers
}