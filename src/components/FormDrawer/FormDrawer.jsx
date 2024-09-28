// src/components/FormDrawer.js
import React, { useContext } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { ThemeContext } from "../../ThemeContext";
import { AppContext } from "../../AppContext";
import {
  FaUser,
  FaUtensils,
  FaTint,
  FaFlask,
  FaBoxes,
  FaDollarSign,
  FaClipboardList,
  FaTimes,
} from "react-icons/fa";
import "./FormDrawer.css"; // Estilos específicos para el Drawer
import axios from "axios";

const FormDrawer = ({ isOpen, toggleDrawer }) => {
  const { theme } = useContext(ThemeContext);
  const { setResponseData } = useContext(AppContext);

  const [clientes, setClientes] = React.useState([]);
  const [recetas, setRecetas] = React.useState([]);

  const [formData, setFormData] = React.useState({
    cliente: "",
    receta: "",
    mililitros: 10,
    nico: 0,
    unidades: 1,
    precioVenta: 1,
    tipo: "CONSULTA",
  });

  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(null);

  React.useEffect(() => {
    // Fetch clientes
    axios
      .get("http://localhost:3001/api/customer")
      .then((response) => {
        // console.log(JSON.stringify(response.data, null, 2));
        setClientes(response.data);
        
      })
      .catch((error) => {
        console.error("Error al obtener clientes:", error);
      });

    // Fetch recetas
    axios
      .get("http://localhost:3001/api/recipes")
      .then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
        setRecetas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener recetas:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones para campos numéricos
    let newValue = value;
    if (["mililitros", "nico", "unidades", "precioVenta"].includes(name)) {
      newValue = e.target.type === "number" ? Number(value) : value;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.cliente) newErrors.cliente = "Selecciona un cliente.";
    if (!formData.receta) newErrors.receta = "Selecciona una receta.";
    if (formData.mililitros <= 0) newErrors.mililitros = "Debe ser mayor a 0.";
    if (formData.unidades <= 0) newErrors.unidades = "Debe ser mayor a 0.";
    if (formData.precioVenta <= 0)
      newErrors.precioVenta = "Debe ser mayor a 0.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitSuccess(null);

    // Enviar datos al backend
    axios
      .post("http://localhost:5000/api/ventas", formData)
      .then((response) => {
        // Actualizar SectionTwo con la respuesta
        setResponseData((prevData) => [response.data, ...prevData]);
        // Resetear el formulario si es necesario
        setFormData({
          cliente: "",
          receta: "",
          mililitros: 10,
          nico: 0,
          unidades: 1,
          precioVenta: 1,
          tipo: "CONSULTA",
        });
        setErrors({});
        setSubmitSuccess("Venta registrada exitosamente.");
      })
      .catch((error) => {
        console.error("Error al enviar la venta:", error);
        setSubmitSuccess("Hubo un error al registrar la venta.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="right"
      size={window.innerWidth < 768 ? "90%" : "500px"}
      className={`form-drawer ${
        theme === "dark" ? "drawer-dark" : "drawer-light"
      }`}
      overlayOpacity={0.5} // Opcional: ajustar opacidad del overlay
      overlayColor="#000" // Opcional: color del overlay
    >
      <div className="drawer-header">
        <h2>Registrar Venta</h2>
        <button className="close-btn" onClick={toggleDrawer}>
          <FaTimes />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`form ${theme === "dark" ? "form-dark" : "form-light"}`}
        noValidate
      >
        {/* Primera fila: Cliente y Receta */}
        <div className="form-row">
          {/* Nombre de Cliente */}
          <div className="form-group">
            <label htmlFor="cliente">
              <FaUser className="form-icon" /> Cliente:
            </label>
            <select
              id="cliente"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              required
            >
              <option value="">-- Selecciona Cliente --</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.Nombre}
                </option>
              ))}
            </select>
            {errors.cliente && <span className="error">{errors.cliente}</span>}
          </div>

          {/* Receta */}
          <div className="form-group">
            <label htmlFor="receta">
              <FaUtensils className="form-icon" /> Receta:
            </label>
            <select
              id="receta"
              name="receta"
              value={formData.receta}
              onChange={handleChange}
              required
            >
              <option value="">-- Selecciona Receta --</option>
              {recetas.map((receta) => (
                <option key={receta.ID} value={receta.ID}>
                  {receta.NombreReceta}
                </option>
              ))}
            </select>
            {errors.receta && <span className="error">{errors.receta}</span>}
          </div>
        </div>

        {/* Segunda fila: Mililitros y Nico */}
        <div className="form-row">
          {/* Mililitros */}
          <div className="form-group">
            <label htmlFor="mililitros">
              <FaTint className="form-icon" /> Mililitros:
            </label>
            <input
              type="number"
              id="mililitros"
              name="mililitros"
              value={formData.mililitros}
              onChange={handleChange}
              min="10"
              step="10"
              required
              placeholder="Mililitros"
            />
            {errors.mililitros && (
              <span className="error">{errors.mililitros}</span>
            )}
          </div>

          {/* Nico */}
          <div className="form-group">
            <label htmlFor="nico">
              <FaFlask className="form-icon" /> Nico:
            </label>
            <input
              type="number"
              id="nico"
              name="nico"
              value={formData.nico}
              onChange={handleChange}
              min="0"
              step="0.5"
              required
              placeholder="Nico"
            />
          </div>
        </div>

        {/* Tercera fila: Unidades y Precio de Venta */}
        <div className="form-row">
          {/* Unidades */}
          <div className="form-group">
            <label htmlFor="unidades">
              <FaBoxes className="form-icon" /> Unidades:
            </label>
            <input
              type="number"
              id="unidades"
              name="unidades"
              value={formData.unidades}
              onChange={handleChange}
              min="1"
              step="1"
              required
              placeholder="Unidades"
            />
            {errors.unidades && (
              <span className="error">{errors.unidades}</span>
            )}
          </div>

          {/* Precio de Venta */}
          <div className="form-group">
            <label htmlFor="precioVenta">
              <FaDollarSign className="form-icon" /> Precio:
            </label>
            <input
              type="number"
              id="precioVenta"
              name="precioVenta"
              value={formData.precioVenta}
              onChange={handleChange}
              min="1"
              step="1"
              required
              placeholder="Precio Venta"
            />
            {errors.precioVenta && (
              <span className="error">{errors.precioVenta}</span>
            )}
          </div>
        </div>

        {/* Tipo de Venta */}
        <div className="form-group">
          <label htmlFor="tipo">
            <FaClipboardList className="form-icon" /> Tipo:
          </label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="VENTA EFECTIVA">VENTA EFECTIVA</option>
            <option value="CONSULTA">CONSULTA</option>
          </select>
        </div>

        {/* Mensaje de Éxito/Error */}
        {submitSuccess && (
          <div
            className={`submit-message ${
              submitSuccess.includes("exitosamente") ? "success" : "error"
            }`}
          >
            {submitSuccess}
          </div>
        )}

        {/* Botón de Envío */}
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </Drawer>
  );
};

export default FormDrawer;
