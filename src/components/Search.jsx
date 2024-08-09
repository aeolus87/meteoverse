import React, { useState, useCallback } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { fetchCities } from '../api/ApiServices';

const customStyles = (isDarkMode) => ({
  control: (provided) => ({
    ...provided,
    backgroundColor: isDarkMode ? '#2a3343' : '#ffffff',
    borderColor: isDarkMode ? '#4a5568' : '#e2e8f0',
    borderRadius: '0.75rem', // Equivalent to Tailwind's rounded-xl
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', // Optional: light shadow for a subtle effect
    '&:hover': {
      borderColor: isDarkMode ? '#6b7280' : '#cbd5e0',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: isDarkMode ? '#2a3343' : '#f1f5f9',
    borderRadius: '0.75rem', // Equivalent to Tailwind's rounded-xl
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? (isDarkMode ? '#4a5568' : '#e2e8f0') : (isDarkMode ? '#2a3343' : '#f1f5f9'),
    color: isDarkMode ? 'white' : 'black',
    borderRadius: '0.75rem', // Adding rounded corners to options
    '&:hover': {
      backgroundColor: state.isFocused ? (isDarkMode ? '#4a5568' : '#e2e8f0') : (isDarkMode ? '#2a3343' : '#e2e8f0'),
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: isDarkMode ? 'white' : 'black',
  }),
});

const Search = ({ onSearchChange, isDarkMode }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = useCallback(async (inputValue) => {
    try {
      const citiesData = await fetchCities(inputValue);
      return {
        options: citiesData.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (error) {
      console.error('Error fetching cities:', error);
      return { options: [] };
    }
  }, []);

  const handleOnChange = useCallback((searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  }, [onSearchChange]);

  return (
    <div className="w-full max-w-md">
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        aria-label="City search"
        noOptionsMessage={() => "No cities found"}
        loadingMessage={() => "Loading cities..."}
        styles={customStyles(isDarkMode)}
        className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default React.memo(Search);
