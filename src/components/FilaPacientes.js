import React, { useEffect, useState } from 'react';
import { obterFila, chamarPaciente, atualizarPrioridade } from '../services/api';
import { Card, CardContent, CardActions, Typography, Button, IconButton, Select, MenuItem, Grid, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import webSocketService from '../services/websocket';

const FilaPacientes = () => {
  const [fila, setFila] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newPrioridade, setNewPrioridade] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFila = async () => {
      try {
        const response = await obterFila();
        setFila(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFila();

    webSocketService.connect(() => {
      webSocketService.subscribe('/topic/patientCalled', (paciente) => {
        setFila((prevFila) => prevFila.filter((p) => p.id !== paciente.id));
      });
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  const handleChamar = async (id) => {
    try {
      await chamarPaciente(id);
      alert('Paciente chamado com sucesso');
      navigate('/pacientes-chamados');
    } catch (error) {
      console.error(error);
      alert('Erro ao chamar paciente');
    }
  };

  const handleEdit = (id, currentPrioridade) => {
    setEditId(id);
    setNewPrioridade(currentPrioridade);
  };

  const handleUpdate = async (id) => {
    try {
      await atualizarPrioridade(id, newPrioridade);
      setFila((prevFila) =>
        prevFila.map((paciente) =>
          paciente.id === id ? { ...paciente, prioridade: newPrioridade } : paciente
        )
      );
      setEditId(null);
      setNewPrioridade('');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar prioridade');
    }
  };

  const prioridadeValor = (prioridade) => {
    switch (prioridade) {
      case "Emergência":
        return 1;
      case "Muito Urgente":
        return 2;
      case "Urgente":
        return 3;
      case "Pouco Urgente":
        return 4;
      case "Não Urgente":
        return 5;
      default:
        return 6;
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>Fila de Pacientes</Typography>
      <Grid container spacing={3}>
        {fila
          .sort((a, b) => prioridadeValor(a.prioridade) - prioridadeValor(b.prioridade))
          .map((paciente) => (
            <Grid item xs={12} md={6} lg={4} key={paciente.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">{paciente.nome}</Typography>
                  {editId === paciente.id ? (
                    <Select
                      value={newPrioridade}
                      onChange={(e) => setNewPrioridade(e.target.value)}
                      fullWidth
                      style={{ marginTop: '16px' }}
                    >
                      <MenuItem value="Emergência">Emergência</MenuItem>
                      <MenuItem value="Muito Urgente">Muito Urgente</MenuItem>
                      <MenuItem value="Urgente">Urgente</MenuItem>
                      <MenuItem value="Pouco Urgente">Pouco Urgente</MenuItem>
                      <MenuItem value="Não Urgente">Não Urgente</MenuItem>
                    </Select>
                  ) : (
                    <Typography color="textSecondary">Prioridade: {paciente.prioridade}</Typography>
                  )}
                </CardContent>
                <CardActions>
                  {editId === paciente.id ? (
                    <IconButton onClick={() => handleUpdate(paciente.id)}>
                      <DoneIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEdit(paciente.id, paciente.prioridade)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  <Button variant="contained" color="secondary" onClick={() => handleChamar(paciente.id)}>Chamar</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default FilaPacientes;
