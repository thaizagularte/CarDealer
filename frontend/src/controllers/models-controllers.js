import { BASE_API } from '../resources/api';
import axios from 'axios';

// Função para buscar o modelo pelo ID
async function getModel(modelId) {
    try {
        // Enviar a requisição para a API com o parâmetro model_id
        const response = await axios.get(`${BASE_API}/vehicle/model`, {
            params: { model_id: modelId }
        });

        // Retornar a resposta da API
        return response.data;
    } catch (error) {
        console.log('Erro ao buscar modelo: ', error);
        return null;  // Retornar null em caso de erro
    }
}

export { getModel };
