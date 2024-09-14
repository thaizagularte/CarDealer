import {BASE_API} from '../resources/api'
import axios from 'axios'

async function getModel() {
    try{
        const response = await axios.get(`${BASE_API}/model/`)
        return response
    }catch(error){
        console.log('Erro ao buscar veiculos: ', error)
    }
}

export {getVehicles}