// import userEvent from '@testing-library/user-event';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// import { exact } from 'prop-types';
// import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

const { render, screen } = require('@testing-library/react');

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

test(`Teste se é renderizado um card com as
informações de determinado pokémon`,
() => {
  renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
  />);
  const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
  const ponkemonRendered = screen.getByTestId('pokemon-name');
  expect(ponkemonRendered).toBeInTheDocument();

  const pokemonName = screen.getByText(/pikachu/i);
  expect(pokemonName).toBeInTheDocument();

  const pokemonImage = screen.getByAltText(`${name} sprite`);
  expect(pokemonImage).toBeInTheDocument();
  
});
