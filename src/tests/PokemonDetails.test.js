// import userEvent from '@testing-library/user-event';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import pokemons from '../data';

const { render, screen } = require('@testing-library/react');

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

test(`Teste se as informações detalhadas do Pokémon
 selecionado são mostradas na tela`, async () => {
  renderWithRouter(<App />);
  const encountredPokemon = screen.getByRole('heading', {
    name: /encountered pokémons/i });
  expect(encountredPokemon).toBeInTheDocument();
  const pokemonName = await screen.findByText(/pikachu/i);
  const detaislLink = screen.getByRole('link', { name: /more details/i });

  expect(pokemonName).toBeInTheDocument();
  expect(detaislLink).toBeInTheDocument();
  userEvent.click(detaislLink);
  const headDetailsPage = await screen.findByRole('heading', {
    name: /pikachu details/i });
  expect(headDetailsPage).toBeInTheDocument();
  expect(detaislLink).not.toBeInTheDocument();

  const sumaryTextDetails = await screen.findByRole('heading', {
    name: /summary/i, level: 2 });
  expect(sumaryTextDetails).toBeInTheDocument();

  const paragraphDetails = screen
    .getByText(/This intelligent Pokémon roasts*./i);
  expect(paragraphDetails).toBeInTheDocument();
});

test(`Teste se existe na página uma seção com
os mapas contendo as localizações do pokémon`, async () => {
  renderWithRouter(<App />);
  const detaislLink = screen.getByRole('link', { name: /more details/i });
  expect(detaislLink).toBeInTheDocument();
  userEvent.click(detaislLink);
  const locationPokemon = await screen.findByRole('heading', {
    name: /game locations of pikachu/i });
  expect(locationPokemon).toBeInTheDocument();

});
