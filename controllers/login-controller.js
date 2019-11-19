var {
    UserMaster
} = require('../model/index');


var checkUserDetails = async function (request, response) {
    // var userMaster = request.body;
    // var userDetails = await UserMaster.findOne(userMaster);
    var userDetails = await UserMaster.find({});
    response.send(userDetails);
};

var addUserDetails = function (request, response) {
    var reqBody = request.body;
    var userDetail = new UserMaster({
        FirstName: reqBody.FirstName,
        LastName: reqBody.LastName,
        Username: reqBody.Username,
        Password: reqBody.Password,
        ContactNo: reqBody.ContactNo,
        EmailId: reqBody.EmailId,
        RoleId: reqBody.RoleId,
        ContactTypeId: reqBody.ContactTypeId,
        ReportToId: reqBody.ReportToId
    });
    userDetail.save().then((result) => {
        response.send(result);
    }).catch((err) => {
        response.status(500).send(err);
    });
};

var updateUserDetails = function (request, response) {
    var reqBody = request.body;
    var id = reqBody.id;
    UserMaster.findByIdAndUpdate({
        _id: id
    }, reqBody, {
        upsert: true,
        returnNewDocument: true
    }, function (err, docs) {
        if (err) {
            response.status(500).send('Error While Updating User');
        } else {
            response.send(docs);
        }
    });
    console.log(request.body.id);
};
var getUserDetails = async function (request, response) {
    var users = await UserMaster.find({});
    response.json(users);
};

var aggUserMaster = async function (request, response) {
    //  var users = await UserMaster.aggregate().exec();
    var users = await UserMaster.aggregate().exec();
    response.json(users);
};

module.exports = {
    checkUserDetails,
    addUserDetails,
    getUserDetails,
    updateUserDetails,
    aggUserMaster
};