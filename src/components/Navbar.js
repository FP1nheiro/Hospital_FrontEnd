import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
            <HomeIcon />
          </IconButton>
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
