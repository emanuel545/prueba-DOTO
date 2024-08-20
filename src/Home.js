import React, { useEffect, useState } from 'react';
import { fetchTop1000Items } from './components/meliService';
import ItemCard from './components/ItemCard';
import './App.css';

const ITEMS_PER_PAGE = 50;

const Home = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchTop1000Items();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredItems(items.filter(item =>
        (item['Marca'] || '').toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredItems(items);
    }
  }, [searchTerm, items]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="home-container">
      <h1 className="page-title">Prueba tecnica Doto</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by brand..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="item-card-container">
            {paginatedItems.map((item, index) => (
              <ItemCard key={index} item={item} />
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredItems.length / ITEMS_PER_PAGE) }, (_, index) => (
              <button
                key={index}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;