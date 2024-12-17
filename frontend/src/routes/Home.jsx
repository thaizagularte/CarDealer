import React, { useEffect, useState } from "react";
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
    <div style={{ display: "flex", height: "100vh" }}>
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
        <h5 style={{ marginBottom: "20px" }}>Menu</h5>
        <div>
          <p
            style={{ cursor: "pointer", marginBottom: "15px" }}
            onClick={() => navigate("/home")}
          >
            Iniciar
          </p>
          <p style={{ cursor: "pointer" }} onClick={() => navigate("/addCar")}>
            Adicionar Veículo
          </p>
        </div>
      </div>

      {/* Área Principal */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {veiculos.map((veiculo) => (
            <div
              key={veiculo.id_model}
              style={{
                width: "150px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={veiculo.imageUrl}
                alt={`Imagem do veículo ${veiculo.modelName}`}
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "10px" }}>
                <h6 style={{ margin: "0 0 5px", fontSize: "0.9rem" }}>
                  {veiculo.modelName}
                </h6>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#555" }}>
                  <strong>Ano:</strong> {veiculo.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
