import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pacientes';

export const obterFila = () => axios.get(API_URL);
export const chamarPaciente = (id) => axios.post(`${API_URL}/${id}/chamar`);
export const registrarPaciente = (paciente) => axios.post(API_URL, paciente);
export const atualizarPrioridade = (id, prioridade) => axios.put(`${API_URL}/${id}/prioridade`, { prioridade });
export const obterPacientesChamados = () => axios.get(`${API_URL}/chamados`);
