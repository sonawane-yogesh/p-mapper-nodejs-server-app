var {
    UserMaster
} = require('../model');
var checkUserDetails = async function (request, response) {
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
        Role: reqBody.Role
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
    var users = await UserMaster.find();
    response.send(users);
};
module.exports = {
    checkUserDetails,
    addUserDetails,
    getUserDetails,
    updateUserDetails
};