var {
    JobDependencies
} = require('../model/job-dependencies');
var {
    AppDependencies
} = require('../model/app-dependencies');

var {
    JobCardMaster
} = require('../model/job-card');
var {
    ApplicationCardMaster
} = require('../model/application-card');
var {
    UserMaster
} = require('../model/user-master');
var {
    FileTextContent
} = require("../model/ass-file-text-content");
var {
    SystemMember
} = require("../model/system-members");
module.exports = {
    JobDependencies,
    AppDependencies,
    JobCardMaster,
    ApplicationCardMaster,
    UserMaster,
    FileTextContent,
    SystemMember
}