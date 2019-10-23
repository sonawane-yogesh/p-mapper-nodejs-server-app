var {
    JobCardMaster,
    ApplicationCardMaster
} = require('../model');
var mongoose = require('mongoose');

var getAllDepedencies = async function (request, response) {
    var id = request.query.id;
    var cardType = request.query.type;
    console.log(cardType);
    var diagramData = {
        Nodes: [],
        Links: []     
    };
    if (cardType === 'job') {
        await getJobList(id, diagramData);
    } else {
        await getAppList(id, diagramData);
    }
    //console.log(finalArr);
    response.json(diagramData);
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
    for (const dependency of results) {
        var nodeCount = 0;
        var parentNode = prepareNode(++nodeCount, dependency.JobTitle, "#90ee90", "RoundRect");
        diagramData.Nodes.push(parentNode);
        for (const d of dependency.Dependencies) {
            // nodeCount++;
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

var getAppList = async function (id, diagramData) {
    var aggregate = [{
        $lookup: {
            from: 'AppDependencies',
            localField: '_id',
            foreignField: 'AppId',
            as: 'Dependencies'
        }
    }, {
        $match: {
            _id: mongoose.Types.ObjectId(id)
        }
    }];

    var results = await ApplicationCardMaster.aggregate(aggregate).exec();
    console.log(results);
    for (const dependency of results) {
        var nodeCount = 0;
        var parentNode = prepareNode(nodeCount, dependency.AppTitle, "#90ee90", "RoundRect");
        diagramData.Nodes.push(parentNode);
        for (const d of dependency.Dependencies) {
            // nodeCount++;
            var node = prepareNode(++nodeCount, d.DependencyTitle, "#ADD8E6", "RoundRect");
            diagramData.Nodes.push(node);
            var nodeLink = prepareLink((nodeCount - 1), nodeCount, d.DependencyTitle, 'red');
            diagramData.Links.push(nodeLink);
            var result = await getAppChildList(d.DependencyId);
            var arr = chkDependency(result[0].Dependencies, diagramData, nodeCount);
            diagramData.Nodes.concat(arr);
        }
    }
    return diagramData;
};

var getAppChildList = async function (id) {
    var aggregate = [{
        $lookup: {
            from: 'AppDependencies',
            localField: '_id',
            foreignField: 'AppId',
            as: 'Dependencies'
        }
    }, {
        $match: {
            _id: mongoose.Types.ObjectId(id)
        }
    }];
    var results = await ApplicationCardMaster.aggregate(aggregate).exec();
    return results;
};
module.exports = {
    getAllDepedencies
};