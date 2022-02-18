// import userEvent from '@testing-library/user-event';
import React from 'react';

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

test('Teste se a página contém um heading `h2` com o texto `About Pokédex`', () => {
  renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />); // acessando o historico
  history.push('/about'); // colocando uma rota errada no historico
  const aboutPokedex = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

  expect(aboutPokedex).toBeInTheDocument();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex: `https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`', () => {
  renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />); // acessando o historico
  history.push('/about'); // colocando uma rota errada no historico
  const imgPokedex = screen.getByRole('img', { name: /pokédex/i });
  expect(imgPokedex).toBeInTheDocument();
  expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
