import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">Sistema de Chamada de Pacientes.</Typography>
        <Typography variant="body2" color="textSecondary">
          © 2024 Sua Empresa. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
