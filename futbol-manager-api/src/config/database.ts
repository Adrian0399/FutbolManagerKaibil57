import { Sequelize } from "sequelize";

const sequelize = new Sequelize("futbol_manager", "futbol_manager_kaibil", "futbol_manager_kaibil", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

export default sequelize;