var {
    JobCardMaster,
    ApplicationCardMaster,
    JobDependencies
} = require('../model');
var mongoose = require('mongoose');


var getAllDepedencies = async function (request, response) {
    "use strict";
    var id = request.query.id;
    var cardType = request.query.type;
    // console.log(cardType);

    var jobCardMaster = await JobCardMaster.findOne({
        _id: mongoose.Types.ObjectId(id)
    });
    var diagramData = {
        Nodes: [],
        Links: []
    };
    var jobNode = prepareNode(jobCardMaster._id.toString(), jobCardMaster.JobTitle, "#90ee90", "RoundRect");
    diagramData.Nodes.push(jobNode);
    await getParents(id, jobNode.Id, diagramData);
    await getChilds(id, jobNode.Id, diagramData);

    response.json(diagramData);
};

var getChilds = async function (jobId, parentId, diagramData) {
    // Find childs...
    "use strict";
    diagramData.Nodes = diagramData.Nodes || [];
    diagramData.Links = diagramData.Links || [];
    var temp = await JobDependencies.find({
        DependencyId: mongoose.Types.ObjectId(jobId)
    });

    for (let v of temp) {
        var jobCard = await JobCardMaster.findOne({
            _id: v.JobId
        });
        var node = prepareNode(jobCard._id.toString(), jobCard.JobTitle, "#ADD8E6", "RoundRect");
        var existingNode = diagramData.Nodes.find(function (e) {
            return e.Id === node.Id;
        });
        if (!existingNode) diagramData.Nodes.push(node);
        var nodeLink = prepareLink(parentId, node.Id, jobCard.JobTitle, "red");
        diagramData.Links.push(nodeLink);
        var job = v.JobId.toString();
        return getChilds(job, node.Id, diagramData);   
    };
    return diagramData;
};
/*
temp.forEach(async function (v) {
    var jobCard = await JobCardMaster.findOne({
        _id: v.JobId
    });
    var node = prepareNode(jobCard._id.toString(), jobCard.JobTitle, "#ADD8E6", "RoundRect")
    diagramData.Nodes.push(node);
    var nodeLink = prepareLink(parentId, node.Id, v.DependencyTitle, "red");
    diagramData.Links.push(nodeLink);
    var job = v.JobId.toString();
    return getParents(job, job, diagramData);
});
return diagramData;
};
*/

var getParents = async function (jobId, targetId, diagramData) {
    // Find parents...
    "use strict";
    diagramData.Nodes = diagramData.Nodes || [];
    diagramData.Links = diagramData.Links || [];
    var temp = await JobDependencies.find({
        JobId: mongoose.Types.ObjectId(jobId)
    });
    temp.forEach(function (v) {
        var node = prepareNode(v.DependencyId.toString(), v.DependencyTitle, "#ADD8E6", "RoundRect");
        var existingNode = diagramData.Nodes.find(function (e) {
            return e.Id === node.Id;
        });
        if (!existingNode) diagramData.Nodes.push(node);
        var nodeLink = prepareLink(node.Id, targetId, v.DependencyTitle, "red");
        diagramData.Links.push(nodeLink);
        var job = v.DependencyId.toString();
        return getParents(job, node.Id, diagramData);
    });
    return diagramData;
};

var getJobList = async function (id, diagramData) {
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
    console.log(results);
    /*
    for (const dependency of results) {
        var nodeCount = 0;
        var parentNode = prepareNode(++nodeCount, dependency.JobTitle, "#90ee90", "RoundRect");
        diagramData.Nodes.push(parentNode);
        for (const d of dependency.Dependencies) {
            var node = prepareNode(++nodeCount, d.DependencyTitle, "#ADD8E6", "RoundRect");
            diagramData.Nodes.push(node);
            var nodeLink = prepareLink((nodeCount - 1), nodeCount, d.DependencyTitle, "red");
            diagramData.Links.push(nodeLink);
            var result = await getJobChildList(d.DependencyId);
            if (result.length <= 0) continue;
            var arr = chkDependency(result[0].Dependencies, diagramData, nodeCount, nodeCount);
            diagramData.Nodes.concat(arr);
        }
    }
    */
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

module.exports = {
    getAllDepedencies
};