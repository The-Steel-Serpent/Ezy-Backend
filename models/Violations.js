const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { vi } = require("translate-google/languages");

const Violations = sequelize.define(
  "Violations",
  {
    violation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "user_account",
        key: "user_id",
      },
    },
    violation_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_reported: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    priority_level: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Thấp",
    },
    resolved_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Chưa xử lý",
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "violations",
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

module.exports = Violations;