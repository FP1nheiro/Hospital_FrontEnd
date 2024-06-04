import React, { useState } from 'react';
import { atualizarPrioridade } from '../services/api';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const AtualizarPrioridade = () => {
  const [id, setId] = useState('');
  const [prioridade, setPrioridade] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await atualizarPrioridade(id, prioridade);
      alert('Prioridade atualizada com sucesso');
      setId('');
      setPrioridade('');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar prioridade');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="ID do Paciente"
        value={id}
        onChange={(e) => setId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Prioridade</InputLabel>
        <Select
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        >
          <MenuItem value="Emergência">Emergência</MenuItem>
          <MenuItem value="Muito Urgente">Muito Urgente</MenuItem>
          <MenuItem value="Urgente">Urgente</MenuItem>
          <MenuItem value="Pouco Urgente">Pouco Urgente</MenuItem>
          <MenuItem value="Não Urgente">Não Urgente</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" fullWidth>Atualizar Prioridade</Button>
    </form>
  );
};

export default AtualizarPrioridade;
