import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const OurProject = db.define('ourprojects',{
    title:{
        type: DataTypes.STRING
    },
    desc:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

export default OurProject;