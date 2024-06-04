import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

function getConectionString(dbname, dialect) {
  if (dialect === "postgres") {
    return `${dialect}://${process.env.user}:${encodeURIComponent(
      process.env.pass
    )}@${process.env.host}:${process.env.dbport}/${dbname}`;
  }
}

let sequelize = null;
export default (name, dialect = "postgres") => {
  if (sequelize) {
    return sequelize;
  }
  sequelize = new Sequelize(getConectionString(name, dialect), {
    logging: false,
    pool: {
      max: 30,
      min: 0,
      acquire: 60000,
      idle: 5000,
    },
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    },
    port: 25060
  });
  (async () => {
    try {
      await sequelize.authenticate();
      console.log(`Connectado a la base de datos ${name} correctamente`);
    } catch (err) {
      console.log(err);
    }
  })();
  return sequelize;
};
