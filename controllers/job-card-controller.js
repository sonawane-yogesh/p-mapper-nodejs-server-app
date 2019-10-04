var {
    JobCardMaster,
    JobDependencies
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
    response.send(jobCards);
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

        await JobDependencies.remove({
            JobId: mongoose.Types.ObjectId(index)
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
    getPredecessor,
    getAllJobCards,
    updateJobCard,
    deleteCards,
    getJobCards,
    updateAssociatedFiles
};