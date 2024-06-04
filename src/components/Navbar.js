import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Sistema de Chamada de Pacientes
          </Typography>
          <Button color="inherit" component={Link} to="/registrar-paciente">Registrar Paciente</Button>
          <Button color="inherit" component={Link} to="/fila-pacientes">Fila de Pacientes</Button>
          <Button color="inherit" component={Link} to="/pacientes-chamados">Pacientes Chamados</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
