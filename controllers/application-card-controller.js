var {
    ApplicationCardMaster,
    AppDependencies
} = require('../model');
var mongoose = require('mongoose');
var addApplicationCard = function (request, response) {
    var reqBody = request.body;
    var dependencies = reqBody.Dependancy;
    var contacts = reqBody.EmergencyContacts;
    var jobCards = reqBody.JobCards;
    var applicationCardData = new ApplicationCardMaster({
        AppTitle: reqBody.AppTitle,
        BusinessPurpose: reqBody.BusinessPurpose,
        Version: reqBody.Version,
        ServerName: reqBody.ServerName,
        ServerIP: reqBody.ServerIP,
        Hardware: reqBody.Hardware,
        OperatingSystem: reqBody.OperatingSystem,
        OsVersion: reqBody.OsVersion,
        CardType: reqBody.CardType,
        EmergencyContacts: contacts,
        Tags: reqBody.Tags,
        SystemOwner: reqBody.SystemOwner,
        BusinessOwner: reqBody.BusinessOwner,
        SystemManager: reqBody.SystemManager,
        BusinessManager: reqBody.BusinessManager,
        CreatedBy: reqBody.CreatedBy,
        JobCards: reqBody.JobCards
    });
    applicationCardData.save().then((result) => {
        dependencies.forEach(function (d) {
            d.AppId = result._id;
            //console.log(d);
        });
        AppDependencies.insertMany(dependencies, function (err, docs) {
            response.json(docs);
        });
    }).catch((err) => {
        response.status(500).send("Error occured!");
    });
};
var getAllApplicationCards = async function (request, response) {
    //var appCards = await ApplicationCardMaster.find();
    var appCards = await ApplicationCardMaster.aggregate().exec();
    response.send(appCards);
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
var deleteAppCards = function (request, response) {
    var reqBody = request.body;
    // zconsole.log(reqBody);
    reqBody.forEach(async function (index, value) {
        await ApplicationCardMaster.findByIdAndDelete({
            _id: index
        });
        await AppDependencies.remove({
            AppId: mongoose.Types.ObjectId(index)
        });
        response.send('Card Deleted Successfully');
    });
};
var getAppCardById = async function (request, response) {
    var id = request.query.id;
    var appAggregate1 = [{
        $lookup: {
            from: 'AppDependencies',
            localField: '_id',
            foreignField: 'AppId',
            as: 'Dependencies'
        }
    }, {
        $match: {
            "_id": mongoose.Types.ObjectId(id)
        }
    }];
    var appCard = await ApplicationCardMaster.aggregate(appAggregate1).exec();
    response.send(appCard);
};
module.exports = {
    addApplicationCard,
    getAllApplicationCards,
    getAppDependancies,
    updateApplicationCard,
    deleteAppCards,
    getAppCardById
};