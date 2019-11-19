var {
    AppDependencies,
    ApplicationCardMaster
} = require("../model");
var mongoose = require("mongoose");

exports.getdependencies = async function (request, response) {
    var applicationCard = await AppDependencies.find({});
    response.json(applicationCard);
};

exports.getAppDependencies = async function (request, response) {
    "use strict";
    var id = request.query.id;
    var diagramData = {
        Nodes: [],
        Links: []
    }
    var applicationCard = await ApplicationCardMaster.findOne({
        _id: mongoose.Types.ObjectId(id)
    });
    var appNode = prepareNode(applicationCard._id.toString(), applicationCard.AppTitle, "#90ee90", "RoundRect", applicationCard.ServerName, applicationCard._id.toString())
    diagramData.Nodes.push(appNode);
    await getParents(id, appNode, diagramData);
    await getChilds(id, appNode, diagramData);
   // console.log(diagramData);
    response.send(diagramData);
};

var getChilds = async function (appId, parent, diagramData) {
    "use strict",
    diagramData.Nodes = diagramData.Nodes || [];
    diagramData.Links = diagramData.Links || [];
    var appDependencies = await AppDependencies.find({
        DependencyId: mongoose.Types.ObjectId(appId)
    });
    for (let a of appDependencies) {
        var toObject = a.toObject();
        var applicationCard = toObject.ApplicationCardMaster;
       // console.log(applicationCard);
        var childNode = prepareNode(applicationCard._id.toString(), applicationCard.AppTitle, "#ADD8E6", "RoundRect", applicationCard.ServerName, parent.GroupId);
        var existingNode = diagramData.Nodes.find(function (e) {
            return e.Id === childNode.Id;
        });
        if (!existingNode) diagramData.Nodes.push(childNode);
        var childLink = prepareLink(parent.Id, childNode.Id, applicationCard.AppTitle, "red");
        var existingLink = diagramData.Links.find(function (e) {
            return e.Origin === childLink.Origin && e.Target === childLink.Target;
        });
        if (!existingLink) diagramData.Links.push(childLink);
        var app = a.AppId.toString();
        await getChilds(app, childNode, diagramData);
    }
    return diagramData;
};

var getParents = async function (appId, target, diagramData) {
    "use strict";
    diagramData.Nodes = diagramData.Nodes || [];
    diagramData.Links = diagramData.Links || [];

    var appDependencies = await AppDependencies.find({
        AppId: mongoose.Types.ObjectId(appId)
    });
    for (let a of appDependencies) {
        var applicationCard = await ApplicationCardMaster.findOne({
            _id: mongoose.Types.ObjectId(a.DependencyId)
        });
        var parentNode = prepareNode(a.DependencyId.toString(), a.DependencyTitle, "#ADD8E6", "RoundRect", applicationCard.ServerName, target.GroupId);
        var existingNode = diagramData.Nodes.find(function (e) {
            return e.Id === parentNode.Id;
        });
        if (!existingNode) diagramData.Nodes.push(parentNode);
        var parentLink = prepareLink(parentNode.Id, target.Id, a.DependencyTitle, "red");
        var existingLink = diagramData.Links.find(function (e) {
            return e.Origin === parentLink.Origin && e.Target === parentLink.Target;
        });
        if (!existingLink) diagramData.Links.push(parentLink);
        var app = a.DependencyId.toString();
        await getParents(app, parentNode, diagramData);
    }
    return diagramData;
};

var prepareNode = function (nodeId, nodeName, color, shape, groupName, groupId) {
    var nodeObj = {
        Id: nodeId,
        Name: nodeName,
        Color: color,
        ShapeId: shape,
        Width: (nodeName.length + 50) + "px",
        GroupName: groupName,
        GroupId: groupId
    }
    return nodeObj;
};

var prepareLink = function (origin, target, linkText, lineColor) {
    var linkObj = {
        LinkText: linkText,
        Origin: origin,
        Target: target,
        LineColor: lineColor
    }
    return linkObj;
};

/*
module.exports = {
    getAllDependencies
}
*/