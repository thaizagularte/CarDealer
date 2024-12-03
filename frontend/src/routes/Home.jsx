import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getVehicles } from "../controllers/vehicles-controllers";
import { getModel } from "../controllers/models-controllers";
import { useNavigate } from "react-router-dom";

function Home() {
  const [veiculos, setVeiculos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getVehicles();

        const vehiclesWithImageUrl = await Promise.all(
          response.map(async (vehicle) => {
            const model = await getModel(vehicle.id_model);
            return {
              ...vehicle,
              imageUrl: `data:image/jpeg;base64,${vehicle.image}`,
              modelName: model.model_name,
            };
          })
        );

        setVeiculos(vehiclesWithImageUrl);
      } catch (error) {
        console.log("Erro ao buscar veículos:", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="d-flex vh-100">
      {/* Menu Lateral */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRight: "1px solid #ddd",
          flexShrink: 0,
        }}
      >
        <h5 className="mb-4">Menu</h5>
        <div>
          <p
            className="mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/home")}
          >
            Iniciar
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/addCar")}
          >
            Adicionar Veículo
          </p>
        </div>
      </div>

      {/* Área Principal */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <Container fluid>
          <Row className="d-flex flex-wrap justify-content-start">
            {veiculos.map((veiculo) => (
              <Col key={veiculo.id_model} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={veiculo.imageUrl}
                    alt={`Imagem do veículo ${veiculo.modelName}`}
                    style={{
                      width: "200px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
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
      </div>
    </div>
  );
}
export default Home;
