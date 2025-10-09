const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const ordersModel = sequelize.define(
    "Orders",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
        },
        tanggal_order: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        jenis_layanan: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        total_berat: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
        },
        total_harga: {
            type: DataTypes.DECIMAL(12, 2),
            defaultValue: 0,
        },
        status_cucian: {
            type: DataTypes.ENUM("proses", "selesai", "diambil"),
            defaultValue: "proses",
        },
        status_payment: {
            type: DataTypes.ENUM("belum_lunas", "lunas", "sisa"),
            defaultValue: "belum_lunas",
        },
        updated_by: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deleted_by: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "Orders",
        timestamps: true,
    }
);

module.exports = { ordersModel };
