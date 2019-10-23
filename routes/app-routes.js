module.exports = appRoutes = [
    ['api/demo-controller/demo', 'demo-controller#demoFunc', 'get'],
    ['api/login-controller/check-user', 'login-controller#checkUserDetails', 'get'],
    ['api/login-controller/add-user', 'login-controller#addUserDetails', 'post'],
    ['api/login-controller/update-user', 'login-controller#updateUserDetails', 'post'],
    ['api/login-controller/get-users', 'login-controller#getUserDetails', 'get'],
    ['api/job-card-controller/add-job', 'job-card-controller#addJobCard', 'post'],
    ['api/job-card-controller/get-predecessor-list', 'job-card-controller#getPredecessor', 'get'],
    ['api/job-card-controller/get-all-job-cards', 'job-card-controller#getAllJobCards', 'get'],
    ['api/file-upload-controller/upload-file', 'file-upload-controller#uploadAssociatedFile', 'post'],
    ['api/file-upload-controller/upload-job-app-file', 'file-upload-controller#uploadJobAndAppFile', 'post'],
    ['api/file-upload-controller/download-file', 'file-upload-controller#downloadFile', 'get'],
    ['api/job-card-controller/update-job-card', 'job-card-controller#updateJobCard', 'post'],
    ['api/job-card-controller/delete-card', 'job-card-controller#deleteCards', 'delete'],
    ['api/job-card-controller/get-job-cards', 'job-card-controller#getJobCards', 'get'],
    ['api/card-dependencies/getAllDepedencies', 'card-dependencies#getAllDepedencies', 'get'],
    ['api/job-card-controller/update-upload-file', 'job-card-controller#updateAssociatedFiles', 'post'],
    ['api/search-controller/search-card', 'search-controller#searchCardDetails', 'get'],
    ['api/application-card-controller/get-all-app-cards', 'application-card-controller#getAllApplicationCards', 'get'],
    ['api/application-card-controller/add-app-card', 'application-card-controller#addApplicationCard', 'post'],
    ['api/application-card-controller/get-app-dependencies', 'application-card-controller#getAppDependancies', 'get'],
    ['api/application-card-controller/update-app-card', 'application-card-controller#updateApplicationCard', 'post'],
    ['api/application-card-controller/delete-card', 'application-card-controller#deleteAppCards', 'delete'],
    ['api/application-card-controller/get-app-card', 'application-card-controller#getAppCardById', 'get'],
    ['api/job-card-controller/get-job-card', 'job-card-controller#getJobCardById', 'get'],
    ['api/system-member-controller/add-system-member', 'system-member-controller#addMembers', 'post'],
    ['api/system-member-controller/get-all-member', 'system-member-controller#getAllMembers', 'get']
];

/*
['api/pdf-reader-controller/read-pdf', 'pdf-reader-controller#extractPdf', 'get']
 ['api/job-card-controller/update-app-card', 'job-card-controller#updateApplicationCard', 'post'],
 ['api/job-card-controller/add-app-card', 'job-card-controller#addApplicationCard', 'post'],
 ['api/job-card-controller/get-app-dependencies', 'job-card-controller#getAppDependancies', 'get'],
*/