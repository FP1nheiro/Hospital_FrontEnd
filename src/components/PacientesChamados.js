import React, { useEffect, useState } from 'react';
import { obterPacientesChamados } from '../services/api';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import webSocketService from '../services/websocket';

const PacientesChamados = () => {
  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    const fetchChamados = async () => {
      try {
        const response = await obterPacientesChamados();
        setChamados(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChamados();

    webSocketService.connect(() => {
      webSocketService.subscribe('/topic/patientCalled', (paciente) => {
        setChamados((prevChamados) => [...prevChamados, paciente]);
      });
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>Pacientes Chamados</Typography>
      <Grid container spacing={3}>
        {chamados.map((paciente) => (
          <Grid item xs={12} md={6} lg={4} key={paciente.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">{paciente.nome}</Typography>
                <Typography color="textSecondary">Prioridade: {paciente.prioridade}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PacientesChamados;
