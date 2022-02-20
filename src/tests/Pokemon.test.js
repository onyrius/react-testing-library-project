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

  const pokemonName = screen.getByText(name);
  expect(pokemonName).toBeInTheDocument();

  const pokemonType = screen.getByText(type);
  expect(pokemonType).toBeInTheDocument();

  const pokemonImage = screen.getByAltText(`${name} sprite`);
  expect(pokemonImage).toBeInTheDocument();
  expect(pokemonImage.src).toContain(image);

  const pokemonWeight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
  expect(pokemonWeight).toBeInTheDocument();
});

test(`Teste se o card do Pokémon indicado na Pokédex contém
 um link de navegação para exibir detalhes deste Pokémon.
 O link deve possuir a URL '/pokemons/<id>', onde '<id>'
 é o id do Pokémon exibido;`, () => {
  renderWithRouter(
    <Pokemon
      showDetailsLink
      pokemon={ pokemons[0] }
      isFavorite
    />,
  );
  const pokeDetails = screen.getByText(/More details/i);
  expect(pokeDetails).toBeInTheDocument();
  const { id } = pokemons[0];
  const pokemonDetailsRoute = `/pokemons/${id}`;
  expect(pokeDetails).toHaveAttribute('href', pokemonDetailsRoute);
});

test(`Teste O ícone deve ser uma imagem com
 o atributo 'src' contendo o caminho '/star-icon.svg'`, async () => {
  renderWithRouter(
    <Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />,
  );
  const { name } = pokemons[0];
  const favPokemon = screen.queryByAltText(`${name} is marked as favorite`);
  const imgFavIconPokemon = '/star-icon.svg';
  expect(favPokemon).toHaveAttribute('src', imgFavIconPokemon);
});

/** source : Higo dos Anjos
 * https://github.com/tryber/sd-018-b-project-react-testing-library/pull/56/files
 */
