// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './composants/Header';
import PokemonCard from './composants/PokemonCard';
import translations from './config/translations';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokedex-api.3rgo.tech/api/pokemon');
        const data = await response.json();
        setPokemonData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleGenerationChange = (generation) => {
    setSelectedGeneration(generation);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
  };

  const currentTranslations = translations[language];

  const filteredAndSortedPokemon = pokemonData
    .filter(pokemon =>
      pokemon.name[language].toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGeneration === '' || pokemon.generation.toString() === selectedGeneration) &&
      (selectedType === '' || pokemon.types.includes(parseInt(selectedType)))
    )
    .sort((a, b) => {
      if (selectedSort === 'number') {
        return a.id - b.id;
      } else if (selectedSort === 'name') {
        return a.name[language].localeCompare(b.name[language]);
      } else if (selectedSort === 'weight') {
        return a.weight - b.weight;
      } else if (selectedSort === 'height') {
        return a.height - b.height;
      }
      return 0;
    });

  return (
    <div className="App">
      <Header
        onSearchChange={handleSearchChange}
        onGenerationChange={handleGenerationChange}
        onTypeChange={handleTypeChange}
        onSortChange={handleSortChange}
        language={language}
        setLanguage={setLanguage}
        selectedGeneration={selectedGeneration}
        selectedType={selectedType}
        translations={currentTranslations}
      />
      <div className="pokemon-cards-container">
        {filteredAndSortedPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            number={pokemon.id}
            name={pokemon.name[language]}
            image={pokemon.image}
            generation={pokemon.generation}
            type={pokemon.types.map((typeId) => typeId.toString()).join(', ')}
            language={language}
            translations={currentTranslations}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
