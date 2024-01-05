// src/components/Header.js
import React from 'react';
import './Header.css';
import logo from '../International_Pokémon_logo.svg.png';
import translations from '../config/translations';

const Header = ({
  onSearchChange,
  onGenerationChange,
  onTypeChange,
  onSortChange,
  language,
  setLanguage,
}) => {
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
  };

  return (
    <header className="header">
      <img src={logo} alt="Pokémon Logo" className="header-logo" />
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder={translations[language]?.searchPlaceholder}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <div className="filters-container">
        <div>
          <label>{translations[language]?.generation}</label>
          <select onChange={(event) => onGenerationChange(event.target.value)}>
            <option value="">All Generations</option>
            <option value="1">Generation 1</option>
            <option value="2">Generation 2</option>
            {/* Ajoutez d'autres générations si nécessaire */}
          </select>
        </div>
        <div>
          <label>{translations[language]?.type}</label>
          <select onChange={(event) => onTypeChange(event.target.value)}>
            <option value="">All Types</option>
            <option value="1">Type 1</option>
            <option value="2">Type 2</option>
            {/* Ajoutez d'autres types si nécessaire */}
          </select>
        </div>
        <div>
          <label>Sort By</label>
          <select onChange={(event) => onSortChange(event.target.value)}>
            <option value="number">Number</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
            <option value="height">Height</option>
          </select>
        </div>
      </div>
      <div className="language-selector">
        <select onChange={handleLanguageChange} value={language}>
          <option value="en">English</option>
          <option value="fr">Français</option>
          {/* Ajoutez d'autres langues si nécessaire */}
        </select>
      </div>
    </header>
  );
};

export default Header;
