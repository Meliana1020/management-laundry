const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { usersModel } = require('../model/usersModel.js');


exports.registrasiUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const cekEmail = await usersModel.findOne({ where: { email } });

        if (cekEmail) {
            return res.status(400).json({ message: "email sudah pernah digunakan." });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        if (!role || !["admin", "customer"].includes(role.toLowerCase())) {
            return res.status(400).json({
                message: "role harus Admin atau Customer."
            })
        }

        await usersModel.create({
            name,
            email,
            password: hash,
            role: role.toLowerCase()
        });

        res.status(201).json({ message: "Akun berhasil ditambahkan." });

    } catch (error) {
        console.error("Gagal mendaftar:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await usersModel.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "Email tidak ditemukan" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Password salah" });
        }

        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.status(200).json({ message: "Berhasil login", token });

    } catch (error) {
        console.error("Gagal login:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};

