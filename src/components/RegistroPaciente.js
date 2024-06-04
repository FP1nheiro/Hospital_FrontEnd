import React, { useState } from 'react';
import { registrarPaciente } from '../services/api';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import InputMask from 'react-input-mask';

const RegistroPaciente = () => {
  const [nome, setNome] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [numero, setNumero] = useState('');

  const handleNumeroChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
    setNumero(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedNumero = `+55${numero}`;
    try {
      await registrarPaciente({ nome, prioridade, numero: formattedNumero });
      alert('Paciente registrado com sucesso');
      setNome('');
      setPrioridade('');
      setNumero('');
    } catch (error) {
      console.error(error);
      alert('Erro ao registrar paciente');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
        margin="normal"
      />
      <InputMask
        mask="99 99999-9999"
        value={numero}
        onChange={handleNumeroChange}
      >
        {() => (
          <TextField
            label="Número"
            fullWidth
            margin="normal"
          />
        )}
      </InputMask>
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
      <Button type="submit" variant="contained" color="primary" fullWidth>Registrar Paciente</Button>
    </form>
  );
};

export default RegistroPaciente;
