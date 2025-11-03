import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import api from '../api/api';
import AppNavbar from '../components/Navbar';
import FormModal from '../components/FormModal';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchData = async () => {
    try {
      const res = await api.get('/items');
      setItems(res.data);
    } catch {
      setError('Gagal mengambil data dari server.');
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.description) {
      setError('Judul dan deskripsi wajib diisi.');
      return;
    }
    try {
      if (editId) {
        await api.put(`/items/${editId}`, form);
        setSuccess('Data berhasil diperbarui.');
      } else {
        await api.post('/items', form);
        setSuccess('Data berhasil ditambahkan.');
      }
      setForm({ title: '', description: '' });
      setEditId(null);
      setShow(false);
      setError('');
      fetchData();
    } catch {
      setError('Gagal menyimpan data.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data ini?')) return;
    try {
      await api.delete(`/items/${id}`);
      setSuccess('Data berhasil dihapus.');
      fetchData();
    } catch {
      setError('Gagal menghapus data.');
    }
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, description: item.description });
    setEditId(item.id);
    setShow(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Dashboard</h3>
          <Button onClick={() => setShow(true)}>Tambah Data</Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && (
          <Alert variant="success" onClose={() => setSuccess('')} dismissible>
            {success}
          </Alert>
        )}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <FormModal
          show={show}
          onHide={() => setShow(false)}
          form={form}
          setForm={setForm}
          onSave={handleSave}
          editId={editId}
          error={error}
        />
      </Container>
    </>
  );
}

export default Dashboard;
