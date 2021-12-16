import { Sequelize } from "sequelize";

const db = new Sequelize('odama_website', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;