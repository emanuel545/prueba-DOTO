const BASE_URL = 'https://api.mercadolibre.com/sites/MLA/search?category=MLA1055';

export const fetchTop1000Items = async () => {
  let allItems = [];
  const LIMIT = 50; 

  try {
    let offset = 0;

    while (allItems.length < 1000) {
      const response = await fetch(`${BASE_URL}&limit=${LIMIT}&offset=${offset}`);
      if (!response.ok) throw new Error('Error fetching data from Mercado Libre API');

      const data = await response.json();
      const items = data.results;

      allItems = [...allItems, ...items];

      if (items.length < LIMIT) {
        break;
      }
      offset += LIMIT;
    }


    const sortedItems = allItems
      .sort((a, b) => a.price - b.price)
      .slice(0, 1000);


    sortedItems.forEach(item => {
      console.log({
        'Meli ID': item.id,
        'Site ID': item.site_id,
        'Título de la publicación': item.title,
        'Seller ID': item.seller.id,
        'Seller Name': item.seller.nickname,
        'Precio de Venta': item.price,
        'Cantidad Disponible para la venta': item.available_quantity,
        'Link de la publicación': item.permalink,
        'Dirección del Seller': item.seller.address?.city?.name || 'N/A',
        'Información del envió': {
          'Aplica Envió Gratis': item.shipping.free_shipping,
          'Tipo de Logística': item.shipping.logistic_type
        },
        'Atributos asociados a la publicación': item.attributes.map(attr => ({
          'Nombre del atributo': attr.name,
          'Valor del atributo': attr.value_name
        }))
      
      });
    });
    console.log()
    return sortedItems.map(item => ({
      'Seller ID': item.seller.id,
      'Seller Name': item.seller.nickname,
      'Marca': item.attributes.find(attr => attr.id === 'BRAND')?.value_name || 'N/A',
      'Envió Gratis': item.shipping.free_shipping,
      'Tipo de Logística': item.shipping.logistic_type,
      'Lugar de operación del Seller': item.seller.address?.city?.name || 'N/A',
      'Condición del artículo': item.condition
    }));
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};