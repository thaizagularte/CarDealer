import React, { useState } from "react";
import InputMask from "react-input-mask";
import { registerUser } from "../controllers/user-controllers";
const UserRegister = () => {
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleCpfCnpjChange = (value) => {
    setCpfCnpj(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio
  
    // Verifique se as senhas são iguais antes de enviar os dados
    if (password1 !== password2) {
      setPasswordError(true);
      return; // Impede o envio se as senhas não coincidirem
    }
  
    setPasswordError(false); // Limpa o erro se as senhas coincidirem
  
    // Chama a função registerUser passando os dados
    try {
      console.log('AQUIIIIIIII', event.target.name.value)
      const response = await registerUser({
        name: event.target.name.value, // Pega o nome do input de nome
        email: event.target.email.value, // Pega o nome do input de email
        password1,
        password2,
        cpf_cnpj: cpfCnpj,
        date_of_birth: isCpf ? event.target.date_of_birth.value : null, // Data de nascimento se for CPF
        company_name: isCnpj ? event.target.company_name.value : null, // Nome da empresa se for CNPJ
        date_of_foundation: isCnpj ? event.target.date_of_foundation.value : null, // Data de fundação se for CNPJ
      });
  
      // Pode tratar a resposta aqui (ex. redirecionar ou mostrar uma mensagem)
      console.log('Usuário registrado com sucesso:', response);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
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
         <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px", // Espaçamento entre os botões
            marginTop: "15px", // Espaço acima dos botões
          }}
        >
          <button
            type="submit"
            style={{
              flex: 1, // Faz os botões ocuparem o mesmo espaço
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Registrar
          </button>
          <button
            type="button" // Tipo de botão para evitar submissão
            onClick={() => window.history.back()} // Voltar para a página anterior
            style={{
              flex: 1, // Faz os botões ocuparem o mesmo espaço
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#565e64")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#6c757d")}
          >
            Voltar
          </button>
        </div>

        </form>
      </div>
    </div>
  );
};

export default UserRegister;
