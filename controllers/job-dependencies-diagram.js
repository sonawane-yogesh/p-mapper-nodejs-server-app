var {
    JobCardMaster,
    JobDependencies
} = require('../model');
var mongoose = require('mongoose');


var getAllDepedencies = async function (request, response) {
    "use strict";
    var id = request.query.id;
    // var cardType = request.query.type;

    var jobCardMaster = await JobCardMaster.findOne({
        _id: mongoose.Types.ObjectId(id)
    });
    var diagramData = {
        Nodes: [],
        Links: []
    };
    var jobNode = prepareNode(jobCardMaster._id.toString(), jobCardMaster.JobTitle, "#90ee90", "RoundRect");
    diagramData.Nodes.push(jobNode);
    await getParents(id, jobNode, diagramData);
    await getChilds(id, jobNode, diagramData);
    response.json(diagramData);
};

var getChilds = async function (jobId, parent, diagramData) {
    // Find childs...
    "use strict";
    diagramData.Nodes = diagramData.Nodes || [];
    diagramData.Links = diagramData.Links || [];

    var jobDependencies = await JobDependencies.find({
        DependencyId: mongoose.Types.ObjectId(jobId)
    });

    for (let v of jobDependencies) {
        var toObject = v.toObject();
        var jobCard = toObject.JobCardMaster;
        var node = prepareNode(jobCard._id.toString(), jobCard.JobTitle, "#ADD8E6", "RoundRect");
        var existingNode = diagramData.Nodes.find(function (e) {
            return e.Id === node.Id;
        });
        if (!existingNode) diagramData.Nodes.push(node);
        var nodeLink = prepareLink(parent.Id, node.Id, jobCard.JobTitle, "red");
        var existingLink = diagramData.Links.find(function (e) {
            return e.Origin === nodeLink.Origin && e.Target === nodeLink.Target;
        });
        if (!existingLink) diagramData.Links.push(nodeLink);
        var job = v.JobId.toString();
        await getChilds(job, node, diagramData);
    }
    return diagramData;
};

var getParents = async function (jobId, target, diagramData) {
    // Find parents...
    "use strict";
    diagramData.Nodes = diagramData.Nodes || [];
    diagramData.Links = diagramData.Links || [];
    var temp = await JobDependencies.find({
        JobId: mongoose.Types.ObjectId(jobId)
    });
    for (let v of temp) {
        var node = prepareNode(v.DependencyId.toString(), v.DependencyTitle, "#ADD8E6", "RoundRect");
        var existingNode = diagramData.Nodes.find(function (e) {
            return e.Id === node.Id;
        });
        if (!existingNode) diagramData.Nodes.push(node);
        var nodeLink = prepareLink(node.Id, target.Id, v.DependencyTitle, "red");
        var existingLink = diagramData.Links.find(function (e) {
            return e.Origin === nodeLink.Origin && e.Target === nodeLink.Target;
        });
        if (!existingLink) diagramData.Links.push(nodeLink);
        var job = v.DependencyId.toString();
        await getParents(job, node, diagramData);
    }
    return diagramData;
};



var prepareNode = function (nodeId, nodeName, color, shape) {
    var obj = {
        Id: nodeId,
        Name: nodeName,
        Color: color, //"#90ee90",
        ShapeId: shape, // "RoundRect",
        Width: (nodeName.length + 50) + "px"
    };
    return obj;
};

var prepareLink = function (origin, target, linkText, lineColor) {
    var link = {
        Origin: origin,
        Target: target,
        LinkText: linkText,
        LineColor: lineColor
    };
    return link;
};

/*
var getJobChildList = async function (id) {
    var aggregate = [{
        $lookup: {
            from: 'JobDependencies',
            localField: '_id',
            foreignField: 'JobId',
            as: 'Dependencies'
        }
    }, {
        $match: {
            _id: mongoose.Types.ObjectId(id)
        }
    }];
    var results = await JobCardMaster.aggregate(aggregate).exec();
    return results;
};

var chkDependency = function (dependencies, diagramData, nodeCount, parentNodeId) {
    if (dependencies.length <= 0) return diagramData;
    var list = dependencies;
    list.forEach(function (value) {
        var nodeObj = prepareNode(++nodeCount, value.DependencyTitle, "#D3D3D3", "RoundRect");
        var link = prepareLink(parentNodeId, nodeCount, value.DependencyTitle, 'red');
        diagramData.Nodes.push(nodeObj);
        diagramData.Links.push(link);
    });
    return diagramData;
};
*/

module.exports = {
    getAllDepedencies
};