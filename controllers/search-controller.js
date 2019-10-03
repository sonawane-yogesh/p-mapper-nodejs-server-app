var {
    JobCardMaster,
    ApplicationCardMaster,
    JobDependencies,
    AppDependencies
} = require('../model');

var searchCardDetails = async function (request, response) {
    var reqBody = request.query.keyword;
    var keywordList = reqBody.split(',');
    var list = [];
    for (keyword of keywordList) {
        var jobAggregate = [{
            $lookup: {
                from: 'JobDependencies',
                localField: '_id',
                foreignField: 'JobId',
                as: 'Dependencies'
            }
        }, {
            $match: {
                $or: [{
                    "JobTitle": {
                        $regex: RegExp(keyword, 'i')
                    }
                }, {
                    "BusinessProcess": {
                        $regex: RegExp(keyword, 'i')
                    }
                }, {
                    "BusinessPurpose": {
                        $regex: RegExp(keyword, 'i')
                    }
                }, {
                    "Tags": keywordList
                }]
            }
        }];
        var regEx = new RegExp(keyword, "i");
        var jobDocs = await JobCardMaster.aggregate(jobAggregate).exec();
        for (job of jobDocs) {
            list.push(job);
        };
        var appAggregate = [{
            $lookup: {
                from: 'AppDependencies',
                localField: '_id',
                foreignField: 'AppId',
                as: 'Dependencies'
            }
        }, {
            $match: {
                $or: [{
                    "AppTitle": {
                        $regex: regEx
                    }
                }, {
                    "BusinessPurpose": {
                        $regex: regEx
                    }
                }]
            }
        }];
        var appDocs = await ApplicationCardMaster.aggregate(appAggregate).exec(); 
        for (app of appDocs) {
            list.push(app);
        };
    };
    response.send(list);
};

module.exports = {
    searchCardDetails
};