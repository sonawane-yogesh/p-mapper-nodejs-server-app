var {
    SystemMember,
    UserMaster
} = require('../model/index');
var mongoose = require('mongoose');

var addMembers = function (request, response) {
    var reqBody = request.body;
    // var reportTo = mongoose.Types.ObjectId(reqBody.ReportTo);    
    var memberDetails = new SystemMember({
        MemberId: reqBody.MemberId,
        MemberName: reqBody.MemberName,
        Email: reqBody.Email,
        AltEmail: reqBody.AltEmail,
        Phone1: reqBody.Phone1,
        Phone2: reqBody.Phone2,
        Phone3: reqBody.Phone3,
        SmsPhone: reqBody.SmsPhone,
        ContactType: reqBody.ContactType,
        ReportTo: reqBody.ReportTo
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

var getAllUserMembers = async function (request, response) {
    var result = await UserMaster.find({});
    response.send(result);
};
var getMembers = async function (request, response) {
    var members = await SystemMember.find();
    var memberList = [];
    members.forEach((m) => {
        memberList.push({
            _id: m._id,
            id: m._id,
            MemberName: m.MemberName,
            ReportTo: m.ReportTo,
            ContactType: m.ContactType,
            label: m.MemberName,
            text: m.MemberName,
            children: []
        });
    });

    var userMembers = await UserMaster.find();
    var userList = [];
    userMembers.forEach((u) => {
        userList.push({
            _id: u._id,
            id: u._id,
            MemberName: `${u.FirstName} ${u.LastName} (${u.Username})`,
            ReportTo: u.ReportToId,
            ContactType: u.ContactTypeId,
            label: `${u.FirstName} ${u.LastName} (${u.Username})`,
            text: `${u.FirstName} ${u.LastName} (${u.Username})`,
            children: []
        });
    });
    var roots = userList.filter((m) => {
        return m.ReportTo === 0 || m.ReportTo === null;
    });
    var nonMembers = userList.filter((m) => {
        return m.ReportTo !== 0 && m.ReportTo !== null;
    });
    var treeData = prepareRootChilds(roots, nonMembers);
    response.send(treeData);
};

var prepareRootChilds = function (rootData, restList) {
    var treeData = [];
    rootData.forEach(r => {
        var childs = restList.filter((m) => {
            return m.ReportTo.toString() === r._id.toString();
        });
        var rt = {
            label: r.MemberName,
            text: r.MemberName,
            id: r._id,
            _id: r._id,
            children: []
        };
        childs.forEach(c => {
            prepareChildList(c, restList, rt.children);
        });
        treeData.push(rt);
    });
    return treeData;
};

var prepareChildList = function (element, restMembers, treeData) {
    var childs = restMembers.filter((m) => {
        return m.ReportTo.toString() === element._id.toString();
    });
    var c = [];
    childs.forEach((ch) => {
        c.push(ch);
    });
    element.children = c;
    treeData.push(element);
    treeData.forEach(function (tree) {
        tree.children.forEach((ch) => {
            prepareChildList(ch, restMembers, ch.children);
        });
    });
    return treeData;
};


module.exports = {
    addMembers,
    getAllMembers,
    getMembers,
    getAllUserMembers
}