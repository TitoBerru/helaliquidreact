// src/components/SectionOne.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Sections.css';
import { ThemeContext } from '../../ThemeContext'; // Para ajustar estilos según el tema
import { AppContext } from '../../AppContext'; // Contexto para compartir datos con SectionTwo
import { FaUser, FaUtensils, FaTint, FaFlask, FaBoxes, FaDollarSign, FaClipboardList } from 'react-icons/fa';

const SectionOne = () => {
  const { theme } = useContext(ThemeContext);
  const { setResponseData } = useContext(AppContext); // Función para actualizar datos en SectionTwo

  const [clientes, setClientes] = useState([]);
  const [recetas, setRecetas] = useState([]);

  const [formData, setFormData] = useState({
    cliente: '',
    receta: '',
    mililitros: 10,
    nico: 0,
    unidades: 1,
    precioVenta: 1,
    tipo: 'VENTA EFECTIVA',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  useEffect(() => {
    // Fetch clientes
    axios.get('http://localhost:5000/api/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener clientes:', error);
      });

    // Fetch recetas
    axios.get('http://localhost:5000/api/recetas')
      .then(response => {
        setRecetas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener recetas:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones para campos numéricos
    let newValue = value;
    if (['mililitros', 'nico', 'unidades', 'precioVenta'].includes(name)) {
      newValue = e.target.type === 'number' ? Number(value) : value;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.cliente) newErrors.cliente = 'Selecciona un cliente.';
    if (!formData.receta) newErrors.receta = 'Selecciona una receta.';
    if (formData.mililitros <= 0) newErrors.mililitros = 'Debe ser mayor a 0.';
    if (formData.unidades <= 0) newErrors.unidades = 'Debe ser mayor a 0.';
    if (formData.precioVenta <= 0) newErrors.precioVenta = 'Debe ser mayor a 0.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitSuccess(null);

    // Enviar datos al backend
    axios.post('http://localhost:5000/api/ventas', formData)
      .then(response => {
        // Actualizar SectionTwo con la respuesta
        setResponseData(prevData => [response.data, ...prevData]);
        // Resetear el formulario si es necesario
        setFormData({
          cliente: '',
          receta: '',
          mililitros: 10,
          nico: 0,
          unidades: 1,
          precioVenta: 1,
          tipo: 'VENTA EFECTIVA',
        });
        setErrors({});
        setSubmitSuccess('Venta registrada exitosamente.');
      })
      .catch(error => {
        console.error('Error al enviar la venta:', error);
        setSubmitSuccess('Hubo un error al registrar la venta.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="section-one">
      <h3>Registrar Venta</h3>
      <form
        onSubmit={handleSubmit}
        className={`form ${theme === 'dark' ? 'form-dark' : 'form-light'}`}
        noValidate
      >
        {/* Nombre de Cliente */}
        <div className="form-group">
          <label htmlFor="cliente">
            <FaUser className="form-icon" /> Nombre de Cliente:
          </label>
          <select
            id="cliente"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecciona un Cliente --</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
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
            <option value="">-- Selecciona una Receta --</option>
            {recetas.map(receta => (
              <option key={receta.id} value={receta.id}>{receta.nombre}</option>
            ))}
          </select>
          {errors.receta && <span className="error">{errors.receta}</span>}
        </div>

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
            placeholder="Ingrese mililitros"
          />
          {errors.mililitros && <span className="error">{errors.mililitros}</span>}
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
            placeholder="Ingrese nico"
          />
        </div>

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
            placeholder="Ingrese unidades"
          />
          {errors.unidades && <span className="error">{errors.unidades}</span>}
        </div>

        {/* Precio de Venta */}
        <div className="form-group">
          <label htmlFor="precioVenta">
            <FaDollarSign className="form-icon" /> Precio de Venta:
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
            placeholder="Ingrese precio de venta"
          />
          {errors.precioVenta && <span className="error">{errors.precioVenta}</span>}
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
          <div className={`submit-message ${submitSuccess.includes('exitosamente') ? 'success' : 'error'}`}>
            {submitSuccess}
          </div>
        )}

        {/* Botón de Envío */}
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default SectionOne;
