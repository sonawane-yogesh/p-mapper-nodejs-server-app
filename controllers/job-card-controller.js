var {
    JobCardMaster,
    ApplicationCardMaster,
    JobDependencies,
    AppDependencies
} = require('../model');
var mongoose = require('mongoose');
var addJobCard = function (request, response) {
    var reqBody = request.body;
    var dependencies = reqBody.Predecessor;
    var cardData = new JobCardMaster({
        JobTitle: reqBody.JobTitle,
        AssociatedFiles: reqBody.AssociatedFiles,
        Tags: reqBody.Tags,
        BusinessPurpose: reqBody.BusinessPurpose,
        BusinessProcess: reqBody.BusinessProcess,
        ExecutionFrequency: reqBody.ExecutionFrequency,
        StartTime: reqBody.StartTime,
        EstimatedTime: reqBody.EstimatedTime,
        MissionStatus: reqBody.MissionStatus,
        CardType: reqBody.CardType
        //Predecessor: reqBody.Predecessor
    });

    cardData.save().then((result) => {
        dependencies.forEach(function (d) {
            d.JobId = result._id;
            // console.log(d);
        });
        JobDependencies.insertMany(dependencies, function (error, docs) {
            response.json(docs);
        });
    }).catch((err) => {
        response.status(500).send("Error occured!");
    });
};

var addApplicationCard = function (request, response) {
    var reqBody = request.body;
    var dependencies = reqBody.Dependancy;
    var applicationCardData = new ApplicationCardMaster({
        AppTitle: reqBody.AppTitle,
        BusinessPurpose: reqBody.BusinessPurpose,
        Version: reqBody.Version,
        ServerName: reqBody.ServerName,
        ServerIP: reqBody.ServerIP,
        Hardware: reqBody.Hardware,
        OperatingSystem: reqBody.OperatingSystem,
        OsVersion: reqBody.OsVersion,
        // Dependancy: reqBody.Dependancy,
        CardType: reqBody.CardType
    });
    // console.log(applicationCardData);
    applicationCardData.save().then((result) => {
        dependencies.forEach(function (d) {
            d.AppId = result._id;
            console.log(d);
        });
        AppDependencies.insertMany(dependencies, function (err, docs) {
            response.json(docs);
        });
        // console.log(res);
        //  response.send("Application-Card saved successfully");
    }).catch((err) => {
        //console.log(err);
        response.status(500).send("Error occured!");
    });
};
var updateApplicationCard = async function (request, response) {
    var reqBody = request.body;
    var id = reqBody.id;
    ApplicationCardMaster.findByIdAndUpdate({
        _id: id
    }, reqBody, {
        upsert: true,
        returnNewDocument: true
    }, function (err, doc) {
        if (err) {
            response.status(500).send('Error While Updating Card');
        } else {
            reqBody.Dependancy.forEach(function (d) {
                d.AppId = doc._id;
                // console.log(d);
            });
            AppDependencies.remove({
                AppId: doc._id
            }, function (e, r) {
                AppDependencies.insertMany(reqBody.Dependancy, function (error, docs) {
                    response.send('Application Card Updated Successfully');
                });
            });
        }
    });
};
var updateJobCard = function (request, response) {
    var reqBody = request.body;
    var id = reqBody.id;
    JobCardMaster.findByIdAndUpdate({
        _id: id
    }, reqBody, {
        upsert: true,
        returnNewDocument: true
    }, function (err, doc) {
        if (err) {
            response.status(500).send('Error While Updating Card')
        } else {
            reqBody.Predecessor.forEach(function (d) {
                d.JobId = doc._id;
            });
            JobDependencies.remove({
                JobId: doc._id
            }, function (e, r) {
                JobDependencies.insertMany(reqBody.Predecessor, function (error, docs) {
                    response.send('Job Card Updated Successfully');
                });
            });
            // response.send('Job Card Updated Successfully');
        }
    });
};
var getPredecessor = async function (request, response) {
    var aggregate = [{
        $lookup: {
            from: 'JobDependencies', // From Which table
            localField: '_id', // Current table _id -- JobCardMaster
            foreignField: 'JobId', // From JobDependencies -- JobId
            as: 'Dependencies' // Property Name
        }
    }];
    JobCardMaster.aggregate(aggregate).exec(function (err, result) {
        response.send(result);
    });
};

var getAppDependancies = async function (request, response) {
    var aggregate = [{
        $lookup: {
            from: 'AppDependencies', // From Which table
            localField: '_id', // Current table _id -- ApplicationCardMaster
            foreignField: 'AppId', // From JobDependencies -- AppId
            as: 'Dependencies' // Property Name
        }
    }];
    ApplicationCardMaster.aggregate(aggregate).exec(function (err, result) {
        response.send(result)
    });
    // var list = await ApplicationCardMaster.find();
    // response.send(list);
};

var getAllJobCards = async function (request, response) {
    var jobAggregate = [{
        $lookup: {
            from: 'JobDependencies',
            localField: '_id',
            foreignField: 'JobId',
            as: 'Dependencies'
        }
    }];
    // var jobCards = await JobCardMaster.find({});
    var jobCards = await JobCardMaster.aggregate(jobAggregate).exec();

    var appAggregate = [{
        $lookup: {
            from: 'AppDependencies',
            localField: '_id',
            foreignField: 'AppId',
            as: 'Dependencies'
        }
    }];
    // var appCards = await ApplicationCardMaster.find();
    var appCards = await ApplicationCardMaster.aggregate(appAggregate).exec();
    var allCards = jobCards.concat(appCards);
    response.send(allCards);
};

var getJobCards = async function (request, response) {
    var jobCards = await JobCardMaster.find();
    response.send(jobCards);
};

var deleteCards = function (request, response) {
    var reqBody = request.body;
    console.log(reqBody);
    reqBody.forEach(async function (index, value) {
        await JobCardMaster.findByIdAndDelete({
            _id: index
        });
        await ApplicationCardMaster.findByIdAndDelete({
            _id: index
        });
        await JobDependencies.remove({
            JobId: mongoose.Types.ObjectId(index)
        });
        await AppDependencies.remove({
            AppId: mongoose.Types.ObjectId(index)
        });
        response.send('Card Deleted Successfully');
    });    
};
var updateAssociatedFiles = async function (request, response) {
    var reqBody = request.body;
    var finalList = [];
    var uploadFileDetails = reqBody.UploadFileDetails;
    var selectedFiles = reqBody.SelectedFiles;
    var filesArray = await JobCardMaster.findOne({
        _id: selectedFiles._id
    });
    filesArray.AssociatedFiles.forEach(function (file) {
        finalList.push(file);
    });
    uploadFileDetails.forEach(function (newFile) {
        finalList.push(newFile);
    })
    console.log(finalList);
    JobCardMaster.findByIdAndUpdate({
        _id: selectedFiles._id
    }, {
        AssociatedFiles: finalList
    }, function (err, docs) {
        if (err)
            response.status(500).send(err);
        else
            response.json(docs);
    });
};
module.exports = {
    addJobCard,
    addApplicationCard,
    getPredecessor,
    getAllJobCards,
    getAppDependancies,
    updateApplicationCard,
    updateJobCard,
    deleteCards,
    getJobCards,
    updateAssociatedFiles
};