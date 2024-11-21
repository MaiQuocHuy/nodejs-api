// models/Todo.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql.config");

class Todo extends Model {}

Todo.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize }
);
sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: " + err));

module.exports = Todo;
