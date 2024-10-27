import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getVehicles } from '../controllers/vehicles-controllers';
import { getModel } from '../controllers/models-controllers';
function Home() {
    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => { 
        const fetchVehicles = async () => {
            try {
                const response = await getVehicles();
                
                // Mapeia os veículos e converte o Blob em URL
                const vehiclesWithImageUrl = await Promise.all(response.map(async (vehicle) => {
                    const model = await getModel(vehicle.id_model); // Obter o nome do modelo
                    return {
                        ...vehicle,
                        imageUrl: `data:image/jpeg;base64,${vehicle.image}`,  // Converte o Blob
                        modelName: model.model_name // Adiciona o nome do modelo ao objeto
                    };
                }));

                setVeiculos(vehiclesWithImageUrl);
            } catch (error) {
                console.log("Erro ao buscar veículos:", error);
            }
        };

        fetchVehicles();

        // Limpa as URLs ao desmontar o componente para evitar vazamento de memória
        return () => {
            veiculos.forEach(veiculo => URL.revokeObjectURL(veiculo.imageUrl));
        };
    }, []);  // Executa apenas na montagem

    return (
        <>
            <Container>
                <h1 className="text-center my-4">Anúncios de Veículos</h1>
                <Row>
                    {veiculos.map((veiculo) => (
                        <Col key={veiculo.id_model} sm={12} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={veiculo.imageUrl} alt={`Imagem do veículo ${veiculo.modelName}`} />
                                <Card.Body>
                                    <Card.Title>Modelo: {veiculo.modelName}</Card.Title>
                                    <Card.Text>
                                        <strong>Ano:</strong> {veiculo.year} <br />
                                        <strong>Estado:</strong> {veiculo.state} <br />
                                        <strong>Quilometragem:</strong> {veiculo.mileage} km
                                    </Card.Text>
                                    <Button variant="primary">Ver mais detalhes</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Home;
