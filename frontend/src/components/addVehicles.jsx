import React, { useState, useEffect } from "react";

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

  // Carrega as marcas ao montar o componente
  useEffect(() => {
    fetch("/api/brands") // Substitua pela rota correta para carregar as marcas
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Erro ao carregar marcas:", error));
  }, []);

  // Carrega os modelos quando uma marca é selecionada
  useEffect(() => {
    if (formData.id_brand) {
      fetch(`/api/models?brand_id=${formData.id_brand}`) // Substitua pela rota correta para carregar modelos
        .then((response) => response.json())
        .then((data) => setModels(data))
        .catch((error) => console.error("Erro ao carregar modelos:", error));
    } else {
      setModels([]);
    }
  }, [formData.id_brand]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    fetch("/api/vehicles", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          alert("Veículo cadastrado com sucesso!");
          // Limpa o formulário ou redireciona
        } else {
          alert("Erro ao cadastrar veículo.");
        }
      })
      .catch((error) => console.error("Erro ao enviar formulário:", error));
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
          padding: "20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1>Criar Anúncio</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="year_car"
            placeholder="Preencha o ano do veículo"
            required
            value={formData.year_car}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state_car"
            placeholder="Preencha o estado do veículo"
            required
            value={formData.state_car}
            onChange={handleChange}
          />
          <input
            type="number"
            name="value_car"
            placeholder="Preencha o valor"
            required
            value={formData.value_car}
            onChange={handleChange}
          />
          <input
            type="number"
            name="mileage_car"
            placeholder="Preencha a quilometragem do veículo"
            value={formData.mileage_car}
            onChange={handleChange}
          />
          <select
            name="id_brand"
            required
            value={formData.id_brand}
            onChange={handleChange}
          >
            <option value="">Selecione uma marca</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name_brand}
              </option>
            ))}
          </select>
          <select
            name="id_model"
            required
            value={formData.id_model}
            onChange={handleChange}
          >
            <option value="">Selecione um modelo</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.model_name}
              </option>
            ))}
          </select>
          <textarea
            name="description_car"
            placeholder="Descrição do veículo"
            required
            value={formData.description_car}
            onChange={handleChange}
          ></textarea>
          <input
            type="file"
            name="image_car"
            accept="image/*"
            onChange={handleChange}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
