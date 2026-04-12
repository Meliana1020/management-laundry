const bcrypt = require('bcryptjs');
const { usersModel } = require('../model/usersModel');

exports.getByIdCustomer = async (req, res) => {
    try {
        const user = await usersModel.findOne({
            where: {
                id: req.user.id,
                role: 'customer',
                deletedAt: null
            },
            attributes: ['id', 'name', 'email', 'role']
        });

        if (!user) {
            return res.status(404).json({ message: "Customer tidak ditemukan" });
        }

        res.status(200).json({
            message: "Berhasil ambil data profile",
            data: user
        });

    } catch (error) {
        console.error("Error get profile:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};


exports.updateCustomer = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await usersModel.findOne({
            where: {
                id: req.user.id,
                role: 'customer',
                deletedAt: null
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Customer tidak ditemukan" });
        }

        await user.update({
            name: name || user.name,
            email: email || user.email
        });

        res.status(200).json({
            message: "Profile berhasil diupdate"
        });

    } catch (error) {
        console.error("Error update profile:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};


exports.deleteCustomer = async (req, res) => {
    try {
        const user = await usersModel.findOne({
            where: {
                id: req.user.id,
                role: 'customer'
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Customer tidak ditemukan" });
        }

        if (user.deletedAt) {
            return res.status(400).json({ message: "Akun sudah dihapus sebelumnya" });
        }

        await user.update({
            deletedAt: new Date()
        });

        res.status(200).json({
            message: "Akun berhasil dihapus (soft delete)"
        });

    } catch (error) {
        console.error("Error delete account:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};


exports.resetPasswordUser = async (req, res) => {
    try {
        const { passwordBaru } = req.body;

        const user = await usersModel.findOne({
            where: {
                id: req.user.id,
                role: 'customer',
                deletedAt: null
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Customer tidak ditemukan" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(passwordBaru, salt);

        await user.update({
            password: hash
        });

        res.status(200).json({
            message: "Password berhasil direset"
        });

    } catch (error) {
        console.error("Error reset password:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};