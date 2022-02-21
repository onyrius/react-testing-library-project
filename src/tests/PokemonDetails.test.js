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

  const imagesLocationPokemon = screen.getAllByAltText('Pikachu location');
  expect(imagesLocationPokemon.length).toBe(2);
  expect(imagesLocationPokemon[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(imagesLocationPokemon[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

  const nameLocation = screen.getByText(/kanto viridian forest/i);
  const nameLocation2 = screen.getByText(/kanto power plant/i);
  expect(nameLocation).toBeInTheDocument();
  expect(nameLocation2).toBeInTheDocument();
});

test(`Teste se o usuário pode favoritar um pokémon
através da página de detalhes.`, () => {
  renderWithRouter(<App />);
  const detaislLink = screen.getByRole('link', { name: /more details/i });
  expect(detaislLink).toBeInTheDocument();
  userEvent.click(detaislLink);

  const checkboxFavNotcheck = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i, checked: false });
  expect(checkboxFavNotcheck).toBeInTheDocument();
  userEvent.click(checkboxFavNotcheck);

  const checkboxFavCheck = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i, checked: true });
  expect(checkboxFavCheck).toBeInTheDocument();
  const starFavPokemon = screen.getByRole('img', {
    name: /pikachu is marked as favorite/i });
  expect(starFavPokemon).toBeInTheDocument();
});
