import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-4">404</h1>
      <p className="lead">Halaman tidak ditemukan.</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Kembali ke Beranda
      </Button>
    </Container>
  );
}

export default NotFound;
