// import userEvent from '@testing-library/user-event';
import React from 'react';
import userEvent from '@testing-library/user-event';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
/* import data from '../data'; */

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
    const buttonCheckFav = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i });
    expect(buttonCheckFav).toBeInTheDocument();
    userEvent.click(buttonCheckFav);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const proxPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(proxPokemonButton);

    const proxPokemon = screen.getByText(/charmander/i);
    expect(proxPokemon).toBeInTheDocument();
    const moreDetailsCharmander = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsCharmander).toBeInTheDocument();
    userEvent.click(moreDetailsCharmander);
    const titleDetailsCharmander = screen.getByRole('heading', {
      name: /charmander details/i });
    expect(titleDetailsCharmander).toBeInTheDocument();

    const buttonNotCheckFavCharmander = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i, checked: false });
    expect(buttonNotCheckFavCharmander).toBeInTheDocument();
    userEvent.click(buttonNotCheckFavCharmander);
    const buttonCheckFavCharmander = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i, checked: true });
    expect(buttonCheckFavCharmander).toBeInTheDocument();

    const favoriteslink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteslink);

    const titlefavoritePokemons = screen.getByRole('heading', {
      name: /favorite pokémons/i });
    expect(titlefavoritePokemons).toBeInTheDocument();

    const starFavoritesPokemons1 = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i });
    expect(starFavoritesPokemons1).toBeInTheDocument();

    const starFavoritesPokemons2 = screen.getByRole('img', {
      name: /charmander is marked as favorite/i });
    expect(starFavoritesPokemons2).toBeInTheDocument();

    const moreDetailsAllLinks = screen.getAllByText(/More details/i);
    expect(moreDetailsAllLinks.length).toBe(2);
    userEvent.click(moreDetailsAllLinks[1]);

    const titleDetailsCharmander2 = screen.getByRole('heading', {
      name: /charmander details/i });
    expect(titleDetailsCharmander2).toBeInTheDocument();

    const buttonCheckFavCharmander2 = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i, checked: true });
    expect(buttonCheckFavCharmander2).toBeInTheDocument();

    userEvent.click(buttonCheckFavCharmander2);
    const buttonCheckNotFavCharmander2 = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i, checked: false });
    expect(buttonCheckNotFavCharmander2).toBeInTheDocument();

    const titlefavoritePokemons2 = screen.getByRole('link', {
      name: /favorite pokémons/i });
    expect(titlefavoritePokemons2).toBeInTheDocument();
    userEvent.click(titleDetailsCharmander2);

    const newFavList = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(newFavList).toBeInTheDocument();
    expect(starFavoritesPokemons2).not.toBeInTheDocument();
  },
);
