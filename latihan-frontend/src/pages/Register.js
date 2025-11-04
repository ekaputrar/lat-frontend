import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Semua field wajib diisi');
      return;
    }
    try {
      await api.post('/auth/register', form);
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch {
      setError('Registrasi gagal. Coba lagi.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }} className="p-4">
        <h4 className="text-center mb-3">Register</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              name="name"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" className="w-100">Register</Button>
        </Form>
        <p className="text-center mt-3">
          Sudah punya akun?{' '}
          <Button variant="link" onClick={() => navigate('/login')}>
            Login di sini
          </Button>
        </p>

      </Card>
    </Container>
  );
}

export default Register;
