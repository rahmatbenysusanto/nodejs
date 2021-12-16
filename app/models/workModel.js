import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Work = db.define('works',{
    title:{
        type: DataTypes.STRING
    },
    desc:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

export default Work;