import React, { useState } from 'react';
import {  Field, ErrorMessage } from 'formik';


const PaymentUser = () => {
  const [hasInsurance, setHasInsurance] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold">Información Sobre Seguros</h2>
            
            <div className="flex items-center space-x-4">
              <label className="block text-gray-700">Seguro Médico:</label>
              <label>
                <Field
                  type="radio"
                  name="seguroMedico"
                  value="si"
                  className="mr-2"
                  onClick={() => setHasInsurance(true)}
                />
                Sí
              </label>
              <label>
                <Field
                  type="radio"
                  name="seguroMedico"
                  value="no"
                  className="mr-2"
                  onClick={() => setHasInsurance(false)}
                />
                No
              </label>
            </div>
            {hasInsurance && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Nombre de la aseguradora:</label>
                  <Field name="nombreAseguradora" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="nombreAseguradora" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <label className="block text-gray-700">Número de póliza:</label>
                  <Field name="numeroPoliza" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="numeroPoliza" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <label className="block text-gray-700">Teléfono de la aseguradora:</label>
                  <Field name="telefonoAseguradora" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="telefonoAseguradora" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <label className="block text-gray-700">Código de Seguridad:</label>
                  <Field name="codigoSeguridadAseguradora" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="codigoSeguridadAseguradora" component="div" className="text-red-600 text-sm" />
                </div>
              </div>
            )}

            <h3 className="text-lg font-semibold">Medio de Pago</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <label>
                  <Field
                    type="radio"
                    name="medioPago"
                    value="Debito"
                    className="mr-2"
                    onClick={() => setPaymentMethod('Debito')}
                  />
                  Débito
                </label>
                <label>
                  <Field
                    type="radio"
                    name="medioPago"
                    value="Credito"
                    className="mr-2"
                    onClick={() => setPaymentMethod('Credito')}
                  />
                  Crédito
                </label>
                <label>
                  <Field
                    type="radio"
                    name="medioPago"
                    value="MercadoPago"
                    className="mr-2"
                    onClick={() => setPaymentMethod('MercadoPago')}
                  />
                  Mercado Pago
                </label>
                <label>
                  <Field
                    type="radio"
                    name="medioPago"
                    value="Efectivo"
                    className="mr-2"
                    onClick={() => setPaymentMethod('Efectivo')}
                  />
                  Efectivo
                </label>
                <label>
                  <Field
                    type="radio"
                    name="medioPago"
                    value="Rapipago"
                    className="mr-2"
                    onClick={() => setPaymentMethod('Rapipago')}
                  />
                  Rapipago
                </label>
                <label>
                  <Field
                    type="radio"
                    name="medioPago"
                    value="PagoFacil"
                    className="mr-2"
                    onClick={() => setPaymentMethod('PagoFacil')}
                  />
                  Pago Fácil
                </label>
                <label>
                  <Field
                    type="radio"
                    name="medioPago"
                    value="Otro"
                    className="mr-2"
                    onClick={() => setPaymentMethod('Otro')}
                  />
                  Otro
                </label>
              </div>
              {(paymentMethod === 'Debito' || paymentMethod === 'Credito') && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Número de la tarjeta:</label>
                    <Field name="numeroTarjeta" className="w-full p-2 border rounded-md" />
                    <ErrorMessage name="numeroTarjeta" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-gray-700">Nombre del Titular:</label>
                    <Field name="nombreTitular" className="w-full p-2 border rounded-md" />
                    <ErrorMessage name="nombreTitular" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-gray-700">Fecha de vencimiento:</label>
                    <Field name="fechaVencimiento" className="w-full p-2 border rounded-md" />
                    <ErrorMessage name="fechaVencimiento" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-gray-700">Código de Seguridad:</label>
                    <Field name="codigoSeguridadTarjeta" className="w-full p-2 border rounded-md" />
                    <ErrorMessage name="codigoSeguridadTarjeta" component="div" className="text-red-600 text-sm" />
                  </div>
                </div>
              )}
            </div>

    </div>
  );
};

export default PaymentUser;


/*
 seguroMedico: '',
          nombreAseguradora: '',
          numeroPoliza: '',
          telefonoAseguradora: '',
          codigoSeguridadAseguradora: '',
          medioPago: '',
          numeroTarjeta: '',
          nombreTitular: '',
          fechaVencimiento: '',
          codigoSeguridadTarjeta: '',

seguroMedico: Yup.string(),
  nombreAseguradora: Yup.string().when('seguroMedico', {
    is: 'si',
    then: Yup.string().required('Requerido'),
  }),
  numeroPoliza: Yup.string().when('seguroMedico', {
    is: 'si',
    then: Yup.string().required('Requerido'),
  }),
  telefonoAseguradora: Yup.string().when('seguroMedico', {
    is: 'si',
    then: Yup.string().required('Requerido'),
  }),
  codigoSeguridadAseguradora: Yup.string().when('seguroMedico', {
    is: 'si',
    then: Yup.string().required('Requerido'),
  }),
  medioPago: Yup.string().required('Requerido'),
  numeroTarjeta: Yup.string().when('medioPago', {
    is: (val) => val === 'Debito' || val === 'Credito',
    then: Yup.string().required('Requerido'),
  }),
  nombreTitular: Yup.string().when('medioPago', {
    is: (val) => val === 'Debito' || val === 'Credito',
    then: Yup.string().required('Requerido'),
  }),
  fechaVencimiento: Yup.string().when('medioPago', {
    is: (val) => val === 'Debito' || val === 'Credito',
    then: Yup.string().required('Requerido'),
  }),
  codigoSeguridadTarjeta: Yup.string().when('medioPago', {
    is: (val) => val === 'Debito' || val === 'Credito',
    then: Yup.string().required('Requerido'),
  }),

*/