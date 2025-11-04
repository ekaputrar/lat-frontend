const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, getAllUsers } = require('../models/userModel');
require('dotenv').config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Register request:', req.body); // Tambahkan in
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword);
    res.status(201).json({ message: 'Registrasi berhasil', user });
  } catch {
    res.status(500).json({ message: 'Registrasi gagal' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Email tidak ditemukan' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Password salah' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch {
    res.status(500).json({ message: 'Login gagal' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data user' });
  }
};
