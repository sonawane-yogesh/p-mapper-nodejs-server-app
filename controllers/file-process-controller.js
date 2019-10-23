var request = require('request');
var rp = require('request-promise');
var fs = require('fs');
var moment = require('moment');
var xlsx = require('node-xlsx');

var {
    JobCardMaster,
    ApplicationCardMaster,
    FileTextContent,
    AppDependencies,
    JobDependencies
} = require('../model');

var fileProcessing = async function () {
    // Step 1. Collect all files which has not processed or text is not yet extracted...
    // Like search for IsTextExtracted = false;    

    var someFiles = await JobCardMaster.aggregate([{
        $project: {
            "AssociatedFiles": {
                $filter: {
                    input: "$AssociatedFiles",
                    as: "items",
                    cond: {
                        $and: [{
                            $eq: ['$$items.IsTextExtracted', false]
                        }, {
                            $in: ["$$items.FileType", [".pdf", ".txt", ".docx", ".doc", ".xlsx", ".csv"]]
                        }]
                    }
                }
            },
            "JobTitle": 1,
            "BusinessPurpose": 1,
            "CardType": 1
        }
    }, {
        $match: {
            "AssociatedFiles.FileType": {
                $exists: true
            }
        }
    }]).exec();

    // Run array look over someFiles...

    for (var file of someFiles) {
        for (var assFile of file.AssociatedFiles) {
            var filePath = assFile.FilePath;
            var formData = {
                uploadFile: fs.createReadStream(filePath)
            };
            var reqResponse = await rp.post({
                url: "http://localhost:3001/api/text-extractor/upload-to-process",
                formData: formData
            });
            var text = JSON.parse(reqResponse);
            var fileContent = new FileTextContent({
                "JobId": file._id,
                "AssociatedFileId": assFile._id,
                "ExtractedText": text.ExtractedText
            });

            fileContent.save().then(async (result) => {
                await JobCardMaster.updateOne({
                    "AssociatedFiles._id": assFile._id
                }, {
                    $set: {
                        "AssociatedFiles.$.IsTextExtracted": true
                    }
                });
                console.log(assFile);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

};

// to validate header of app-job excel sheet 
var validateJobSheet = function (compareWith, firstRow) {
    return compareWith.every(function (value, index) {
        return RegExp(value, "i").test(firstRow[index]);
    });
};
var compareWithJob = ["title", "business purpose", "business process", "execution frequency",
    "start time", "estimated run time", "mission critical", "card type", "tags", "successor job titles"
];

var compareWithApp = ["title", "business purpose", "version", 'server name', 'server ip', 'hardware',
    'operating system', 'os version', 'card type', 'tags', 'successor app titles'
];

//extract ,process and the details into DB 
var jobAndAppFileProcessing = async function (filePath) {
    var text = xlsx.parse(fs.readFileSync(filePath), {
        raw: false
    });
    var jobCards = [];
    var appCards = [];
    for (let arr of text) {
        let card = {
            CardType: arr.name,
            ObjData: arr.data
        };
        if (card.CardType === "Job Card") {
            var isValid = validateJobSheet(compareWithJob, card.ObjData[0]);
            if (!isValid) return;
            for (let i = 1; i < card.ObjData.length; i++) {
                jobCards.push(card.ObjData[i]);
            }
        } else {
            var isValid = validateJobSheet(compareWithApp, card.ObjData[0]);
            if (!isValid) return;
            for (let j = 1; j < card.ObjData.length; j++) {
                appCards.push(card.ObjData[j]);
            }
        }

        //loop to insert job card Objects
        for (j of jobCards) {
            var jobObj = {
                JobTitle: j[0],
                BusinessPurpose: j[1],
                BusinessProcess: j[2],
                ExecutionFrequency: j[3],
                StartTime: j[4],
                EstimatedTime: j[5],
                MissionStatus: j[6] === "Y" ? true : false,
                CardType: j[7],
                Tags: j[8].split(',')

            }
            var jobCardData = new JobCardMaster(jobObj);
            await jobCardData.save();
            console.log(jobObj);
        }
    }

    //for inserting job dependencies
    for (let a of jobCards) {
        var jobTitle = a[0];
        var baseJob = await JobCardMaster.findOne({
            "JobTitle": jobTitle
        });
        // , SuccessorJobTitles: j[9]
        var depeJobs = a[9].split(',') || [];
        var exp = "";
        depeJobs.forEach(function (d, i) {
            exp += `^${d}$`;
            if (i < depeJobs.length - 1) exp += "|";
        });

        var dependJobs = await JobCardMaster.find({
            "JobTitle": RegExp(exp, "i")
        });
        for (let j of dependJobs) {
            var jobDependencies = new JobDependencies({
                DependencyId: j._id,
                DependencyTitle: j.JobTitle,
                JobId: baseJob._id
            });
            var yedi = await jobDependencies.save();
            console.log(yedi);
        }
    }

    //loop to insert application card object
    for (a of appCards) {
        var tags = a[9].split(',');
        var appObj = {
            AppTitle: a[0],
            BusinessPurpose: a[1],
            Version: a[2],
            ServerName: a[3],
            ServerIP: a[4].toString(),
            Hardware: a[5],
            OperatingSystem: a[6],
            OsVersion: a[7],
            CardType: a[8],
            Tags: tags
        }
        var appCardData = new ApplicationCardMaster(appObj);
        await appCardData.save();
        console.log(appObj);
    }

    //for inserting Appdependencies
    for (a of appCards) {
        var appTitle = a[0];
        var baseApp = await ApplicationCardMaster.findOne({
            "AppTitle": appTitle
        });
        //SuccessorAppTitles:a[10]
        var depeTitles = a[10].split(",") || [];
        var exp = "";
        depeTitles.forEach(function (d, i) {
            exp += `^${d}$`;
            if (i < depeTitles.length - 1) exp += "|";
        });
        var dependApps = await ApplicationCardMaster.find({
            "AppTitle": RegExp(exp, "i")
        });

        for (let dj of dependApps) {
            var appDependencies = new AppDependencies({
                DependencyId: dj._id,
                DependencyTitle: dj.AppTitle,
                AppId: baseApp._id
            });
            var yedi = await appDependencies.save();
            console.log(yedi);
        }
    }
};

module.exports = {
    fileProcessing,
    jobAndAppFileProcessing
};