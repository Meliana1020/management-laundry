const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { usersModel } = require('../model/usersModel.js');


async function registrasiUser(req, res) {
    try {
        const { name, email, password, role } = req.body;

        const cekEmail = await usersModel.findOne({ where: { email } });

        if (cekEmail) {
            return res.status(400).json({ message: "email sudah pernah digunakan." });
        }

        const cekPasswordSama = await usersModel.findAll({ attributes: ['password'] });
        for (const user of cekPasswordSama) {
            const cekPassword = await bcrypt.compare(password, user.password);
            if (cekPassword) {
                return res.status(400).json({
                    message: "Password sudah pernah digunakan."
                });
            }
        }

        const salt = await bcrypt.genSalt();
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
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const cekData = await usersModel.findAll();

        if (cekData.length === 0) {
            return res.status(404).json({ message: "Data admin tidak ditemukan." });
        } else {
            const cekEmail = await usersModel.findOne({where: { email }});

            if (!cekEmail) {
                return res.status(404).json({ message: "Email tidak ditemukan" });
            }

            const hash = await bcrypt.compare(password, cekEmail.password);

            if (!hash) {
                return res.status(401).json({ message: "Password salah" });
            }

            const dataJwt = jwt.sign({
                id: cekEmail.id,
                name: cekEmail.name,
                email: cekEmail.email,
                role: cekEmail.role,
            }, process.env.SECRET_KEY);

            res.status(200).json({ message: "Berhasil login", token: `${dataJwt}` });
        }
    } catch (error) {
        console.error("Gagal mendaftar:", error.message);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
}

module.exports = {
    registrasiUser,
    loginUser
}