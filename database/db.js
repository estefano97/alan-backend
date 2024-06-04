import { Sequelize } from 'sequelize';
import { database } from '../config.js';

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: "db-postgresql-nyc3-91337-do-user-16525309-0.c.db.ondigitalocean.com",
        port: 25060,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false // This line will fix new error
          }
        },
    }
    
);

export default sequelize;