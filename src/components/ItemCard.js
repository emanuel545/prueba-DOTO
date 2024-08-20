import React from 'react';

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <h2>{item['Marca']}</h2>
      <p><strong>Seller ID:</strong> {item['Seller ID']}</p>
      <p><strong>Seller Name:</strong> {item['Seller Name']}</p>
      <p><strong>Marca:</strong> {item['Marca']}</p>
      <p><strong>Envió Gratis:</strong> {item['Envió Gratis'] ? 'Sí' : 'No'}</p>
      <p><strong>Tipo de Logística:</strong> {item['Tipo de Logística']}</p>
      <p><strong>Lugar de operación del Seller:</strong> {item['Lugar de operación del Seller']}</p>
      <p><strong>Condición del artículo:</strong> {item['Condición del artículo']}</p>
    </div>
  );
};

export default ItemCard;