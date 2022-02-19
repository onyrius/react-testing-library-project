// import userEvent from '@testing-library/user-event';
import React from 'react';
import userEvent from '@testing-library/user-event';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

const { render, screen } = require('@testing-library/react');

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

test(
  ' Testa  `No favorite pokemon found`, quando não tiver pokémons favoritos',
  () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const noFavorites = screen.getByText(/no favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  },
);

test(
  'Testa se é exibido todos os cards de pokémons favoritados',
  async () => {
    renderWithRouter(<App />);
    const encountredPokemon = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    const moreDetails = screen.getByRole('link', { name: /more details/i });

    expect(encountredPokemon).toBeInTheDocument();
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');
    const pokemonDetails = await screen.findAllByText(/pikachu details/i);
    expect(pokemonDetails[0]).toBeInTheDocument(); // è recebido um array em pokemonDetails e especifico o que deve ser encontrado quando coloco a posiçao  [0] no array

    const boxChoiceFavoritePokemon = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i });
    userEvent.click(boxChoiceFavoritePokemon);

    history.push('/favorites');
    const pokemonFarites = await screen.findAllByText(/pikachu/i);
    expect(pokemonFarites[0]).toBeInTheDocument();
  },
);
