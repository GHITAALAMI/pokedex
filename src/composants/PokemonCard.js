// src/components/PokemonCard.js
import React from 'react';
import './PokemonCard.css';
import translations from '../config/translations';

const PokemonCard = ({ number, name, image, generation, type, language }) => {
  return (
    <div className="pokemon-card">
      <div className="pokemon-number">#{number}</div>
      <div className="pokemon-name">{name}</div>
      <div className="pokemon-image-container">
        <img src={image} alt={name} className="pokemon-image" />
      </div>
      <div className="pokemon-info-container">
        <div className="pokemon-generation">
          {translations[language].generation}: {generation}
        </div>
        <div className="pokemon-types">
          {translations[language].type}: {type}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
