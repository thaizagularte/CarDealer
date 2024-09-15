import React, { useState, useEffect } from 'react';
import { getModel } from '../controllers/models-controllers';
import { deleteVehicle, editVehicle } from '../controllers/vehicles-controllers';

const VehicleItem = ({ vehicle }) => {
  const [modelName, setModelName] = useState('');

    getModel(vehicle.id_model).then((model) => {
      setModelName(model.model_name);
    });

  const imageSrc = vehicle.image.startsWith('data:')
    ? vehicle.image
    : `data:image/jpeg;base64,${vehicle.image}`;

  return (
    <div style={styles.vehicleItem}>
      <img src={imageSrc} alt={vehicle.id} style={styles.image} />
      <div style={styles.info}>
        <p style={styles.detail}><b>Modelo:</b> {modelName}</p>
        <p style={styles.detail}><b>Ano:</b> {vehicle.year}</p>
        <p style={styles.detail}><b>Quilometragem:</b> {vehicle.mileage} km</p>
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={() => {alert('Aqui vai abrir a tela de editar o veículo')}} style={styles.button}>Editar</button>
        <button onClick={() => {deleteVehicle(vehicle.id)}} style={styles.button}>Deletar</button>
      </div>
    </div>
  );
};

const ComponentListVehicles = ({ vehicles }) => {
  if (!Array.isArray(vehicles)) {
    return <div style={styles.loading}>Carregando...</div>;
  }

  return (
    <div style={styles.list}>
      {vehicles.length === 0 ? (
        <div style={styles.empty}>Nenhum veículo encontrado.</div>
      ) : (
        vehicles.map((vehicle) => (
          <VehicleItem key={vehicle.id} vehicle={vehicle} />
        ))
      )}
    </div>
  );
};

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  vehicleItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginRight: '20px',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px', // Espaço entre as informações
  },
  detail: {
    fontSize: '25px',
    color: '#555',
    marginLeft: '2em',
    marginRight: '2em'
  },
  buttonContainer: {
    marginLeft: '50em',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', // Espaço entre os botões
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#666',
  },
  empty: {
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#999',
  },
};

export default ComponentListVehicles;
