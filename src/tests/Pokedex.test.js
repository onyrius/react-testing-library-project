// import userEvent from '@testing-library/user-event';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
// import { filterPokemons } from '../components/Pokedex';

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

    userEvent.click(buttonProx);
    const proxPokemon5 = screen.getByText(/rapidash/i);
    expect(proxPokemon5).toBeInTheDocument();

    userEvent.click(buttonProx);
    const proxPokemon6 = screen.getByText(/snorlax/i);
    expect(proxPokemon6).toBeInTheDocument();

    userEvent.click(buttonProx);
    const proxPokemon7 = screen.getByText(/dragonair/i);
    expect(proxPokemon7).toBeInTheDocument();

    userEvent.click(buttonProx);
    const proxPokemon8 = screen.getByText(/pikachu/i);
    expect(proxPokemon8).toBeInTheDocument();
  },
);

test(
  '- Teste se a Pokédex tem os botões de filtro.',
  () => {
    renderWithRouter(<App />);
    const filterAllButton = screen.getByRole('button', { name: /all/i });
    const filterElectricButton = screen.getByRole('button', { name: /electric/i });
    const filterFireButton = screen.getByRole('button', { name: /fire/i });
    const filterBugButton = screen.getByRole('button', { name: /bug/i });
    const filterPoisonButton = screen.getByRole('button', { name: /poison/i });
    const filterPsychicButton = screen.getByRole('button', { name: /psychic/i });
    const filterNormalButton = screen.getByRole('button', { name: /normal/i });
    const filterDragonButton = screen.getByRole('button', { name: /dragon/i });

    expect(filterAllButton).toBeInTheDocument();
    expect(filterElectricButton).toBeInTheDocument();
    expect(filterFireButton).toBeInTheDocument();
    expect(filterBugButton).toBeInTheDocument();
    expect(filterPoisonButton).toBeInTheDocument();
    expect(filterPsychicButton).toBeInTheDocument();
    expect(filterNormalButton).toBeInTheDocument();
    expect(filterDragonButton).toBeInTheDocument();
  },
);

test(
  `Testa se partir da seleção de um botão de tipo,
   a Pokédex circula somente pelos pokémons daquele tipo`,
  () => {
    renderWithRouter(<App />);
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    const allButtonsLength = 7;
    expect(allButtons).toHaveLength(allButtonsLength);
    userEvent.click(allButtons[4]);
    const psychicInTheScreen = screen.getByRole('img', { name: /alakazam sprite/i });
    expect(psychicInTheScreen).toBeInTheDocument();
  },
);

test(
  `A Pokedéx deverá mostrar os Pokémons normalmente
   (sem filtros) quando o botão 'All' for clicado;`,
  async () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
  },
);
