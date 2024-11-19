import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from '../controllers/user-controllers';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      const response = await loginUser(email, password);

      if(response.status === 200){
        navigate('/home')
      } else {
        alert('Erro no login!')
      }

    } catch (error) {
      console.log("Erro no login:", error);
      alert("Falha ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div style={bodyStyle}>
      <div style={containerStyle}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            required
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
          />
          <input
            type="submit"
            value="Entrar"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          />
        </form>
        <div style={registerLinkStyle}>
          <p>
            Não tem uma conta?{" "}
            <Link
              to="/register"
              style={anchorStyle}
              onMouseOver={(e) => (e.target.style.textDecoration = anchorHoverStyle.textDecoration)}
              onMouseOut={(e) => (e.target.style.textDecoration = anchorStyle.textDecoration)}
            >
              Registre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// Estilos
const containerStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  width: "300px",
  textAlign: "center",
};

const bodyStyle = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f4f4f9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  margin: "0",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ddd",
  borderRadius: "4px",
  boxSizing: "border-box",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "#ffffff",
  border: "none",
  padding: "10px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
};

const buttonHoverStyle = {
  backgroundColor: "#0056b3",
};

const registerLinkStyle = {
  marginTop: "10px",
};

const anchorStyle = {
  color: "#007bff",
  textDecoration: "none",
};

const anchorHoverStyle = {
  textDecoration: "underline",
};
