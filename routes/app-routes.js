var demoRoutes = [
    ['api/demo-controller/demo', 'demo-controller#demoFunc', 'get']
];
var userRoutes = [
    ['api/login-controller/check-user', 'login-controller#checkUserDetails', 'get'],
    ['api/login-controller/add-user', 'login-controller#addUserDetails', 'post'],
    ['api/login-controller/update-user', 'login-controller#updateUserDetails', 'post'],
    ['api/login-controller/get-users', 'login-controller#getUserDetails', 'get'],
    ['api/login-controller/agg-user-master', 'login-controller#aggUserMaster', 'get'],
    ['api/login-controller/login', 'login-controller#getUserByName', 'post'],
    ['api/login-controller/check-existing-user', 'login-controller#checkExisingUser', 'get'],
    ['api/login-controller/change-password', 'login-controller#updatePassword', 'post']
];
var jobRoutes = [
    ['api/job-card-controller/add-job', 'job-card-controller#addJobCard', 'post'],
    ['api/job-card-controller/get-predecessor-list', 'job-card-controller#getPredecessor', 'get'],
    ['api/job-card-controller/get-all-job-cards', 'job-card-controller#getAllJobCards', 'get'],
    ['api/job-card-controller/update-job-card', 'job-card-controller#updateJobCard', 'post'],
    ['api/job-card-controller/delete-card', 'job-card-controller#deleteCards', 'delete'],
    ['api/job-card-controller/get-job-cards', 'job-card-controller#getJobCards', 'get'],
    ['api/job-card-controller/update-upload-file', 'job-card-controller#updateAssociatedFiles', 'post'],
    ['api/job-card-controller/get-job-card', 'job-card-controller#getJobCardById', 'get']
];
var applicationRoutes = [
    ['api/application-card-controller/get-all-app-cards', 'application-card-controller#getAllApplicationCards', 'get'],
    ['api/application-card-controller/add-app-card', 'application-card-controller#addApplicationCard', 'post'],
    ['api/application-card-controller/get-app-dependencies', 'application-card-controller#getAppDependancies', 'get'],
    ['api/application-card-controller/update-app-card', 'application-card-controller#updateApplicationCard', 'post'],
    ['api/application-card-controller/delete-card', 'application-card-controller#deleteAppCards', 'delete'],
    ['api/application-card-controller/get-app-card', 'application-card-controller#getAppCardById', 'get'],
    ['api/app-dependencies-diagram/get-app-dependencies', 'app-dependencies-diagram#getAppDependencies', 'get'],
    ['api/app-dependencies-diagram/getdependencies', 'app-dependencies-diagram#getdependencies', 'get']
];
var fileuploadRoutes = [
    ['api/file-upload-controller/upload-file', 'file-upload-controller#uploadAssociatedFile', 'post'],
    ['api/file-upload-controller/upload-job-app-file', 'file-upload-controller#uploadJobAndAppFile', 'post'],
    ['api/file-upload-controller/download-file', 'file-upload-controller#downloadFile', 'get']
];
var systemMemberRoutes = [
    ['api/system-member-controller/add-system-member', 'system-member-controller#addMembers', 'post'],
    ['api/system-member-controller/get-all-member', 'system-member-controller#getAllMembers', 'get'],
    ['api/maintanance-activity-controller/add-activity', 'maintanance-activity-controller#addActivity', 'post'],
    ['api/maintanance-activity-controller/get-all', 'maintanance-activity-controller#aggAll', 'get'],
    ['api/system-member-controller/get-members', 'system-member-controller#getMembers', 'get'],
    ['api/system-member-controller/get-user-members', 'system-member-controller#getAllUserMembers', 'get'],
    ['api/maintanance-activity-controller/get-all-activities', 'maintanance-activity-controller#getActivities', 'get'],
    ['api/maintanance-activity-controller/update-activity', 'maintanance-activity-controller#updateActivity', 'post'],
    ['api/maintanance-activity-controller/get-Maintanace-Change-Phase', 'maintanance-activity-controller#getMaintanaceChangePhase', 'post'],
    ['api/maintanance-activity-controller/get-change-phase-by-id', 'maintanance-activity-controller#getChangePhaseById', 'get'],

];
var testRoutes = [
    ['api/card-dependencies/getAllDepedencies', 'card-dependencies#getAllDepedencies', 'get'],
    ['api/search-controller/search-card', 'search-controller#searchCardDetails', 'get'],
    ['api/card-dependencies/get-all-dependencies', 'job-dependencies-diagram#getAllDepedencies', 'get']
];
var memberReviewRoutes = [
    ['api/member-review-controller/add-member-review', 'member-review-controller#addMemberReview', 'post'],
    ['api/member-review-controller/get-member', 'member-review-controller#getMemberReviewById', 'get'],
    ['api/member-review-controller/delete-goal', 'member-review-controller#deleteGoalById', 'delete'],
    ['api/member-review-controller/delete-skill', 'member-review-controller#deleteSkillById', 'delete']
];

var roleRoutes = [
    ["api/role-master-controller/add-role", "role-master-controller#addRole", 'post'],
    ["api/role-master-controller/get-all-role", "role-master-controller#getAllRole", 'get']
];

var contactTypeRoutes = [
    ["api/contact-type-controller/add-contact-type", "contact-type-controller#addContactType", 'post'],
    ["api/contact-type-controller/get-all-contact-type", "contact-type-controller#getAllContactType", 'get'],
    ['api/member-review-controller/add-member-review', 'member-review-controller#addMemberReview', 'post']
];

var technicalSkillRoutes = [
    ["api/technical-skill-controller/add-skill", "technical-skill-controller#addSkill", 'post'],
    ["api/technical-skill-controller/get-skills", "technical-skill-controller#getSkills", 'get'],
];
var dashBoardRoutes = [
    ["api/dashboard-controller/dashBoard-Counts", "dashboard-controller#dashBoardCounts", 'get'],
    ["api/dashboard-controller/get-Distinct-Application", "dashboard-controller#getDistinctApplication", 'get'],
    ['api/dashboard-controller/get-apps', "dashboard-controller#getRoleBasedApps", 'get'],
    ['api/dashboard-controller/get-incident', "dashboard-controller#getIncident", 'get'],
    ['api/dashboard-controller/get-app-incident-projects', "dashboard-controller#getAppIncidentProjects", 'get']

];

var mainMenuMaster = [
    ["api/main-menu-master-controller/add-main-menu", "main-menu-master-controller#addMainMenu", 'post'],
    ["api/main-menu-master-controller/get-all-main-menu", "main-menu-master-controller#getAllMainMenu", 'get'],
    ["api/main-menu-master-controller/main-menu", "main-menu-master-controller#mainMenuMaster", 'get'],
    ["api/main-menu-master-controller/get-menu-update", "main-menu-master-controller#getAllMainMenuUpdate", 'get']
];

var subMenuMaster = [
    ["api/sub-menu-master-controller/add-sub-menu", "sub-menu-master-controller#addSubMenu", 'post'],
    ["api/sub-menu-master-controller/get-all-sub-menu", "sub-menu-master-controller#getAllSubMenu", 'get']
];

var roleWiseMenuMaster = [
    ["api/role-wise-menu-master-controller/add-role-menu", "role-wise-menu-master-controller#addRoleMenu", 'post'],
    ["api/role-wise-menu-master-controller/get-all-role-menu", "role-wise-menu-master-controller#getAllRoleMenu", 'get'],
    ["api/role-wise-menu-master-controller/get-role-menu", "role-wise-menu-master-controller#getRoleMenuByRoleId", 'get'],
    ["api/role-wise-menu-master-controller/get-sub-Menu", "role-wise-menu-master-controller#getAllSubRoleMenu", 'get'],
    ["api/role-wise-menu-master-controller/get-role-menu-by-id", "role-wise-menu-master-controller#getRoleMenuById", 'get'],
    ["api/role-wise-menu-master-controller/update-rolemenu", "role-wise-menu-master-controller#updateRoleMenu", 'post']
];

var incidentRoutes = [
    ["api/incident-controller/add-incident", "incident-controller#addIncident", "post"],
    ["api/incident-controller/get-incidents", "incident-controller#getIncidents", "get"],
    ["api/incident-controller/update-incident", 'incident-controller#updateIncident', "post"],
    ["api/incident-controller/update-status", "incident-controller#updateStatus", "post"],
    ["api/incident-controller/get-statuses", "incident-controller#getStatusReport", "get"],
    ["api/incident-controller/test-incident-results","incident-controller#testIncidentResult","get"]
]

var appRoutes = Array.prototype.concat(demoRoutes, userRoutes, jobRoutes, applicationRoutes, fileuploadRoutes,
    systemMemberRoutes, testRoutes, memberReviewRoutes, roleRoutes, contactTypeRoutes,
    technicalSkillRoutes, dashBoardRoutes, mainMenuMaster, subMenuMaster, roleWiseMenuMaster, incidentRoutes);
module.exports = appRoutes;