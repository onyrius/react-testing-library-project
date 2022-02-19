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
  'Teste se página contém um heading `h2` com o texto `Encountered pokémons`',
  () => {
    renderWithRouter(<App />);
    const encountredEl = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(encountredEl).toBeInTheDocument();
  },
);

test(
  'è exibido o próximo Pokémon da lista quando o botão `Próximo pokémon` é clicado',
  () => {
    renderWithRouter(<App />);
    const buttonProx = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonProx).toBeInTheDocument();
    userEvent.click(buttonProx);
    const proxPokemon = screen.getByText(/charmander/i);
    expect(proxPokemon).toBeInTheDocument();

    userEvent.click(buttonProx);
    const proxPokemon1 = screen.getByRole('img', { name: /caterpie sprite/i });
    expect(proxPokemon1).toBeInTheDocument();

    userEvent.click(buttonProx);
    const proxPokemon2 = screen.getByText(/ekans/i);
    expect(proxPokemon2).toBeInTheDocument();

    userEvent.click(buttonProx);
    const proxPokemon3 = screen.getByText(/alakazam/i);
    expect(proxPokemon3).toBeInTheDocument();

    userEvent.click(buttonProx);
    const proxPokemon4 = screen.getByText(/mew/i);
    expect(proxPokemon4).toBeInTheDocument();
  },
);

/* test(
  'O 1° Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;',
  () => {
    renderWithRouter(<App />);
    const allPokemons = screen.getByRole('button', { name: /all/i });
    expect(allPokemons).toBeInTheDocument();
  },
);
 */
