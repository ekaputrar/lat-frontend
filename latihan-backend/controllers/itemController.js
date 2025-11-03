const {
  getItemsByUser,
  createItem,
  updateItem,
  deleteItem,
} = require('../models/itemModel');

exports.getItems = async (req, res) => {
  try {
    const items = await getItemsByUser(req.user.id);
    res.json(items);
  } catch {
    res.status(500).json({ message: 'Gagal mengambil data' });
  }
};

exports.createItem = async (req, res) => {
  const { title, description } = req.body;
  try {
    const item = await createItem(title, description, req.user.id);
    res.status(201).json(item);
  } catch {
    res.status(500).json({ message: 'Gagal menambahkan data' });
  }
};

exports.updateItem = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const item = await updateItem(id, title, description, req.user.id);
    res.json(item);
  } catch {
    res.status(500).json({ message: 'Gagal memperbarui data' });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteItem(id, req.user.id);
    res.json({ message: 'Data berhasil dihapus' });
  } catch {
    res.status(500).json({ message: 'Gagal menghapus data' });
  }
};
