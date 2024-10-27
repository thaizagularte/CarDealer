import { useEffect, useState } from 'react'
import '../App.css'
import {getVehicles} from '../controllers/vehicles-controllers'
import ComponentListVehicles from '../components/listVehicles'

function ListVehicles() {
    const [veiculos, setVeiculos] = useState({})
    useEffect(() => {
        getVehicles().then((response) =>{
            setVeiculos(response)
        }).catch(error => {
            console.log(error)
        })
    })

    return (
        <>
        <ComponentListVehicles vehicles={veiculos}/> 
        </>
    );
}

export default ListVehicles