import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API } from "../resources/api";
import { addVehicle } from "../controllers/vehicles-controllers";

const AddVehicle = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [formData, setFormData] = useState({
    year_car: "",
    state_car: "",
    value_car: "",
    mileage_car: "",
    id_brand: "",
    id_model: "",
    description_car: "",
    image_car: null,
  });
  const navigate = useNavigate()

  // Carrega as marcas ao montar o componente
  useEffect(() => {
    fetch(`${BASE_API}/vehicle/brands`) // Substitua pela rota correta para carregar as marcas
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Erro ao carregar marcas:", error));

      fetch(`${BASE_API}/vehicle/models`) // Substitua pela rota correta para carregar modelos
        .then((response) => response.json())
        .then((data) => setModels(data))
        .catch((error) => console.error("Erro ao carregar modelos:", error));
  }, []);

 

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cria um objeto FormData
    const formDataObj = new FormData();
    for (const key in formData) {
        formDataObj.append(key, formData[key]);
    }

    try {
        // Chama a função de API para adicionar o veículo
        const result = await addVehicle(formDataObj);
        alert('Veículo adicionado com sucesso!');
        console.log(result);
        navigate('/home'); // Redireciona após o sucesso
    } catch (error) {
        alert('Erro ao adicionar veículo. Verifique os dados.');
        console.error(error);
    }
};

  return (
    <div
    style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        width: "400px",
        padding: "30px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", color: "#333", marginBottom: "10px" }}>
          Criar Anúncio
        </h1>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Preencha os campos abaixo para criar um novo anúncio.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Campo de Ano */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Ano do veículo:</label>
          <input
            type="text"
            name="year_car"
            placeholder="Ex.: 2022"
            required
            value={formData.year_car}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Campo de Estado */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Estado do veículo:</label>
          <input
            type="text"
            name="state_car"
            placeholder="Ex.: Novo ou Usado"
            required
            value={formData.state_car}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Campo de Valor */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Valor:</label>
          <input
            type="number"
            name="value_car"
            placeholder="Ex.: 50000"
            required
            value={formData.value_car}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Campo de Quilometragem */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Quilometragem:</label>
          <input
            type="number"
            name="mileage_car"
            placeholder="Ex.: 30000"
            value={formData.mileage_car}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Seleção de Marca */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Marca:</label>
          <select
            name="id_brand"
            required
            value={formData.id_brand}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Selecione uma marca</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name_brand}
              </option>
            ))}
          </select>
        </div>

        {/* Seleção de Modelo */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Modelo:</label>
          <select
            name="id_model"
            required
            value={formData.id_model}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Selecione um modelo</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.model_name}
              </option>
            ))}
          </select>
        </div>

        {/* Campo de Descrição */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Descrição:</label>
          <textarea
            name="description_car"
            placeholder="Escreva uma breve descrição do veículo."
            required
            value={formData.description_car}
            onChange={handleChange}
            style={{ ...inputStyle, height: "80px", resize: "none" }}
          ></textarea>
        </div>

        {/* Upload de Imagem */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Imagem do veículo:</label>
          <input
            type="file"
            name="image_car"
            accept="image/*"
            onChange={handleChange}
            style={{ ...inputStyle, padding: "5px" }}
          />
        </div>

      {/* Botões de Envio e Voltar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px", // Espaçamento entre os botões
        }}
      >
        <button
          type="submit"
          style={{
            flex: 1, // Faz os botões ocuparem o mesmo espaço
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
        <button
          type="button" // "type" como "button" para não interferir no submit
          onClick={() => navigate('/home')} // Ação de voltar para a página anterior
          style={{
            flex: 1, // Faz os botões ocuparem o mesmo espaço
            padding: "10px",
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Voltar
        </button>
      </div>
      </form>
    </div>
  </div>
  );
};

export default AddVehicle;
const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "14px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
  color: "#333",
};
