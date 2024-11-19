import React, { useState } from "react";
import InputMask from "react-input-mask";

const UserRegister = () => {
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleCpfCnpjChange = (value) => {
    setCpfCnpj(value);
  };

  const handleSubmit = (event) => {
    if (password1 !== password2) {
      event.preventDefault();
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  // Determina se o valor inserido é CPF ou CNPJ
  const isCpf = cpfCnpj.length === 14; // Exemplo: 999.999.999-99
  const isCnpj = cpfCnpj.length === 18; // Exemplo: 99.999.999/9999-99

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "60px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Registro de Usuário
        </h2>
        <form
          id="registrationForm"
          action="http://localhost:5000/auth/registerUser"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
              Nome de Usuário:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password1"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Senha:
            </label>
            <input
              type="password"
              id="password1"
              name="password1"
              required
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password2"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Confirme a Senha:
            </label>
            <input
              type="password"
              id="password2"
              name="password2"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
            {passwordError && (
              <div style={{ color: "red", fontSize: "0.875em" }}>
                As senhas não coincidem
              </div>
            )}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="cpf_cnpj"
              style={{ display: "block", marginBottom: "5px" }}
            >
              CPF/CNPJ:
            </label>
            <InputMask
              mask={isCpf ? "999.999.999-99" : "99.999.999/9999-99"}
              maskChar={null}
              value={cpfCnpj}
              onChange={(e) => handleCpfCnpjChange(e.target.value)}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  id="cpf_cnpj"
                  name="cpf_cnpj"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                  }}
                />
              )}
            </InputMask>
          </div>
          {isCpf && (
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="date_of_birth"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Data de Nascimento:
              </label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
            </div>
          )}
          {isCnpj && (
            <>
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="company_name"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Nome da Empresa:
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="date_of_foundation"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Data de Fundação:
                </label>
                <input
                  type="date"
                  id="date_of_foundation"
                  name="date_of_foundation"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </>
          )}
          <div>
            <input
              type="submit"
              value="Registrar"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#007bff")
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
