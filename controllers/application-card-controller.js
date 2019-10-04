var {
    ApplicationCardMaster,
    AppDependencies
} = require('../model');

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
    applicationCardData.save().then((result) => {
        dependencies.forEach(function (d) {
            d.AppId = result._id;
            console.log(d);
        });
        AppDependencies.insertMany(dependencies, function (err, docs) {
            response.json(docs);
        });
    }).catch((err) => {
        response.status(500).send("Error occured!");
    });
};
var getAllApplicationCards = async function (request, response) {
    var appAggregate = [{
        $lookup: {
            from: 'AppDependencies',
            localField: '_id',
            foreignField: 'AppId',
            as: 'Dependencies'
        }
    }];

    var appCards = await ApplicationCardMaster.aggregate(appAggregate).exec();
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
    console.log(reqBody);
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
module.exports = {
    addApplicationCard,
    getAllApplicationCards,
    getAppDependancies,
    updateApplicationCard,
    deleteAppCards
}