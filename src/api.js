import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const registrarPaciente = (paciente) => api.post('/pacientes', paciente);
export const atualizarPrioridade = (id, prioridade) => api.put(`/pacientes/${id}/prioridade`, { prioridade });
export const obterFila = () => api.get('/pacientes/fila');
export const chamarPaciente = (id) => api.post(`/pacientes/${id}/chamar`);
