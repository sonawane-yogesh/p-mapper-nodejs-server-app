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
    UserMaster,
    UserMasterSchema
} = require('../model/user-master');
var {
    FileTextContent
} = require("../model/ass-file-text-content");
var {
    SystemMember
} = require("../model/system-members");
var {
    GeneralSkillsMaster,
    GoalsMaster,
    GoalsMasterSchema,
    GeneralSkillSchema
} = require("../model/member-review-schema");
var {
    MaintenanceActivity
} = require("../model/maintanance-activity");

var {
    MemberReviewMaster
} = require("../model/member-review");

var {
    RoleMaster
} = require("../model/role-master");

var {
    ContactTypeMaster
} = require("./contact-type-master");
var {
    TechnicalSkillMaster
} = require("./technical-skill");

var {
    MaintanaceChangePhase
} = require("./maintanance-change-phase");

var {
    MainMenuMaster
} = require("./main-menu-master");

var {
    SubMenuMaster
} = require("./sub-menu-master");

var {
    RoleWiseMenuMaster
} = require("./role-wise-menu-master");

var {
    IncidentMaster
} = require("./incident-master");

module.exports = {
    JobDependencies,
    AppDependencies,
    JobCardMaster,
    ApplicationCardMaster,
    UserMaster,
    UserMasterSchema,
    FileTextContent,
    SystemMember,
    GeneralSkillsMaster,
    GoalsMaster,
    GoalsMasterSchema,
    GeneralSkillSchema,
    MaintenanceActivity,
    MemberReviewMaster,
    RoleMaster,
    ContactTypeMaster,
    TechnicalSkillMaster,
    MaintanaceChangePhase,
    MainMenuMaster,
    SubMenuMaster,
    RoleWiseMenuMaster,
    IncidentMaster
}