import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, Box } from '@mui/material';
import Navbar from './components/Navbar';
import FilaPacientes from './components/FilaPacientes';
import PacientesChamados from './components/PacientesChamados';
import RegistrarPaciente from './components/RegistroPaciente';
import Footer from './components/Footer';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Router>
          <Navbar />
          <Container component="main" style={{ flexGrow: 1, marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}>
            <Routes>
              <Route path="/" element={<FilaPacientes />} />
              <Route path="/fila-pacientes" element={<FilaPacientes />} />
              <Route path="/pacientes-chamados" element={<PacientesChamados />} />
              <Route path="/registrar-paciente" element={<RegistrarPaciente />} />
            </Routes>
          </Container>
          <Footer />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
