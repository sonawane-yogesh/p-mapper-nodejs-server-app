var {
    JobCardMaster,
    ApplicationCardMaster,
    FileTextContent
} = require('../model');

var searchCardDetails = async function (request, response) {
    var reqBody = request.query.keyword;
    var keywordList = reqBody.split(',');
    var list ={
        jobList:[],
        appList:[],
        textContentList:[]
    };
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
            list.jobList.push(job);
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
            list.appList.push(app);
        };

        // Starting search in TextConents...
        var fileTextContentAggregate = [{
            $unwind: {
                path: "$AssociatedFile",
                preserveNullAndEmptyArrays: true
            }
        }, {
            $lookup: {
                from: 'JobCardMaster',
                localField: 'JobId',
                foreignField: '_id',
                as: 'JobCardMaster'
            }
        }, {
            $match: {
                "ExtractedText": {
                    $regex: regEx
                }
            }
        }, {
            $unwind: {
                path: "$JobCardMaster",
                preserveNullAndEmptyArrays: true
            }
        }];
    };
    var textContents = await FileTextContent.aggregate(fileTextContentAggregate).exec();
    for (textContent of textContents) {
        var assFile = textContent.JobCardMaster.AssociatedFiles
            .filter(a => a._id.toString() === textContent.AssociatedFileId.toString());
        textContent.JobCardMaster.AssociatedFiles = assFile;
        list.textContentList.push(textContent.JobCardMaster);
    };
    response.send(list);
};

module.exports = {
    searchCardDetails
};