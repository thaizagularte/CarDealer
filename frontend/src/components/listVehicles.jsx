import React from 'react';

const VehicleItem = ({ vehicle }) => {

  const [modelName, setModelName] = useState('');

  useEffect(() => {
    
  }, [vehicle.id_model]);

  const imageSrc = vehicle.image.startsWith('data:')
    ? vehicle.image
    : `data:image/jpeg;base64,${vehicle.image}`;

  return (
    <div style={styles.vehicleItem}>
      <img src={imageSrc} alt={vehicle.id} style={styles.image} />
      <div style={styles.info}>
        <p style={styles.detail}>Modelo: {vehicle.id_model}</p>
        <p style={styles.detail}>Ano: {vehicle.year}</p>
        <p style={styles.detail}>Quilometragem: {vehicle.mileage} km</p>
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
        vehicles.map(vehicle => (
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
    flexDirection: 'column',
  },
  id: {
    margin: '0 0 10px 0',
    fontSize: '1.2em',
    color: '#333',
  },
  detail: {
    margin: '2px 0',
    fontSize: '1em',
    color: '#555',
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
