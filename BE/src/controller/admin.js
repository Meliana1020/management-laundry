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