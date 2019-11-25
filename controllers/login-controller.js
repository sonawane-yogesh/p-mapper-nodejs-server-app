var {
    UserMaster
} = require('../model/index');

var checkUserDetails = async function (request, response) {
    // var userMaster = request.body;
    // var userDetails = await UserMaster.findOne(userMaster);
    var userDetails = await UserMaster.find({});
    response.send(userDetails);
};

var checkExisingUser = async function (request, response) {
    var user = request.query.username;
    var user = await UserMaster.exists({
        Username: user
    });
    response.send(user);
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
    /* while updating user or password to use "save" middleware we need to replace 
    the following code   
     */
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
};

var getUserDetails = async function (request, response) {
    var users = await UserMaster.find({});
    response.json(users);
};

var aggUserMaster = async function (request, response) {
    var users = await UserMaster.aggregate().exec();
    response.json(users);
};

var getUserByName = async function (request, response) {
    var reqBody = request.body;

    try {
        const user = await UserMaster.findByCredentials(reqBody.Username, reqBody.Password);
        response.send(user);
    } catch (e) {
        response.status(400).send(e.message);
    };
};

var updatePassword = async function (request, response) {
    var reqBody = request.body;
    try {
        var user = await UserMaster.findOne({
            Username: reqBody.Username
        });
        user.Password = reqBody.Password
        await user.save();
        if (!user) {
            response.status(400).send();
        }
        response.send("Password Updated Successfully");
    } catch (e) {
        response.status(400).send(e.message);
    }
};
module.exports = {
    checkUserDetails,
    addUserDetails,
    getUserDetails,
    updateUserDetails,
    aggUserMaster,
    getUserByName,
    checkExisingUser,
    updatePassword
};