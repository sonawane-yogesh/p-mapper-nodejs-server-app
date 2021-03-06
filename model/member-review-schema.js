var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var generalSkillsSchema = new Schema({
    QualityOfWork: {
        type: String,
        required: true
    },
    Productivity: {
        type: String,
        required: true
    },
    Dependability: {
        type: String,
        required: true
    },
    CoworkerRelation: {
        type: String,
        required: true
    },
    ClientRelation: {
        type: String,
        required: true
    },
    Creativity: {
        type: String,
        required: true
    },
    Communications: {
        type: String,
        required: true
    },
    CreatedBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    CreatedOn: {
        type: Date,
        default: Date.now,
        required: false
    },
    UpdatedOn: {
        type: Date,
        default: Date.now,
        required: false
    }
});

var goalsMasterSchema = new Schema({
    GoalTitle: {
        type: String,
        required: true
    },
    Notes: {
        type: String,
        required: false
    },
    Projection: {
        type: String,
        required: false
    },
    CurrentStatus: {
        type: String,
        required: true
    },
    CreatedBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    CreatedOn: {
        type: Date,
        default: Date.now,
        required: false
    },
    UpdatedOn: {
        type: Date,
        default: Date.now,
        required: false
    }   
});

var technicalSkillSchema = new Schema({
    SkillName: {
        type: String,
        required: true
    },
    SkillId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    Rating: {
        type: Number,
        required: true
    }
});

var currentProjects = new Schema({
    ProjectId: {
        type: mongoose.Types.ObjectId
    },
    TicketTitle: {
        type: String
    }
});
module.exports.GoalsMasterSchema = goalsMasterSchema;
module.exports.GeneralSkillSchema = generalSkillsSchema;
module.exports.TechSkillSchema = technicalSkillSchema;
module.exports.CurrentProjectSchema = currentProjects;
module.exports.GeneralSkillMaster = server.model('GeneralSkillMaster', generalSkillsSchema, 'GeneralSkillMaster');
module.exports.GoalsMaster = server.model('GoalsMaster', goalsMasterSchema, 'GoalsMaster');
module.exports.TechSkillMaster = server.model("TechSkillMaster", technicalSkillSchema, "TechSkillMaster");
module.exports.CurrentProjectMaster = server.model("CurrentProjectMaster", currentProjects, "CurrentProjectMaster")