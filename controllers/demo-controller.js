var {JobCardMaster}=require("../model/index");

exports.demoFunc = function (request, response) {
    return response.send({
        'message': 'Test Response'
    });
};

exports.countCards=async function(request,response){
var jobCards=await JobCardMaster.where({}).countDocuments();
}