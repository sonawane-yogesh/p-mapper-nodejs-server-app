var {
    TechnicalSkillMaster
} = require("../model/index");

var addSkill = function (request, response) {
    var reqBody = request.body;
    TechnicalSkillMaster.create(reqBody).then((r) => {
        response.send(r);
    }).catch((err) => {
        response.send(err);
    });
};
var getSkills = async function (request, response) {
    var skills = await TechnicalSkillMaster.find();
    response.send(skills);
};
module.exports = {
    addSkill,
    getSkills
};