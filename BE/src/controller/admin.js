const bcrypt = require('bcryptjs');
const { usersModel } = require('../model/usersModel.js');

exports.getAllUser = async (_req, res) => {
    try {
        const users = await usersModel.findAll({
            attributes: ['id', 'name', 'email', 'role'],
            where: {
                deletedAt: null
            }
        });

        res.status(200).json({
            message: "Berhasil ambil data user",
            data: users
        });

    } catch (error) {
        console.error("Gagal ambil user:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await usersModel.findOne({
            where: {
                id,
                deletedAt: null
            },
            attributes: ['id', 'name', 'email', 'role']
        });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        res.status(200).json({
            message: "Berhasil ambil detail user",
            data: user
        });

    } catch (error) {
        console.error("Error get user by id:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        const user = await usersModel.findOne({
            where: {
                id,
                deletedAt: null
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        await user.update({
            name: name || user.name,
            email: email || user.email,
            role: role || user.role
        });

        res.status(200).json({
            message: "User berhasil diupdate"
        });

    } catch (error) {
        console.error("Error update user:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { passwordBaru } = req.body;

        const user = await usersModel.findOne({
            where: {
                id,
                deletedAt: null
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(passwordBaru, salt);

        await user.update({
            password: hash
        });

        res.status(200).json({
            message: "Password user berhasil direset"
        });

    } catch (error) {
        console.error("Error reset password:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await usersModel.findOne({
            where: { id }
        });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        if (user.deletedAt) {
            return res.status(400).json({ message: "User sudah dihapus sebelumnya" });
        }

        await user.update({
            deletedAt: new Date()
        });

        res.status(200).json({
            message: "User berhasil dihapus (soft delete)"
        });

    } catch (error) {
        console.error("Error delete user:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};