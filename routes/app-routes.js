var demoRoutes = [
    ['api/demo-controller/demo', 'demo-controller#demoFunc', 'get']
];
var userRoutes = [
    ['api/login-controller/check-user', 'login-controller#checkUserDetails', 'get'],
    ['api/login-controller/add-user', 'login-controller#addUserDetails', 'post'],
    ['api/login-controller/update-user', 'login-controller#updateUserDetails', 'post'],
    ['api/login-controller/get-users', 'login-controller#getUserDetails', 'get']
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
];
var fileuploadRoutes = [
    ['api/file-upload-controller/upload-file', 'file-upload-controller#uploadAssociatedFile', 'post'],
    ['api/file-upload-controller/upload-job-app-file', 'file-upload-controller#uploadJobAndAppFile', 'post'],
    ['api/file-upload-controller/download-file', 'file-upload-controller#downloadFile', 'get'],
];
var systemMemberRoutes = [
    ['api/system-member-controller/add-system-member', 'system-member-controller#addMembers', 'post'],
    ['api/system-member-controller/get-all-member', 'system-member-controller#getAllMembers', 'get'],
    ['api/maintanance-activity-controller/add-activity', 'maintanance-activity-controller#addActivity', 'post'],
    ['api/maintanance-activity-controller/get-all', 'maintanance-activity-controller#aggAll', 'get'],
    ['api/system-member-controller/get-members', 'system-member-controller#getMembers', 'get']

];
var testRoutes = [
    ['api/card-dependencies/getAllDepedencies', 'card-dependencies#getAllDepedencies', 'get'],
    ['api/search-controller/search-card', 'search-controller#searchCardDetails', 'get'],
];
var memberReviewRoutes = [
    ['api/member-review-controller/add-member-review', 'member-review-controller#addMemberReview', 'post']
];

var roleRoutes = [
    ["api/role-master-controller/add-role", "role-master-controller#addRole", 'post'],
    ["api/role-master-controller/get-all-role", "role-master-controller#getAllRole", 'get']
];

var contactTypeRoutes = [
    ["api/contact-type-controller/add-contact-type", "contact-type-controller#addContactType", 'post'],
    ["api/contact-type-controller/get-all-contact-type", "contact-type-controller#getAllContactType", 'get'],
     ['api/member-review-controller/add-member-review', 'member-review-controller#addMemberReview', 'post'],
]

var appRoutes = Array.prototype.concat(demoRoutes, userRoutes, jobRoutes, applicationRoutes, fileuploadRoutes, systemMemberRoutes, testRoutes, memberReviewRoutes, roleRoutes, contactTypeRoutes);
module.exports = appRoutes;