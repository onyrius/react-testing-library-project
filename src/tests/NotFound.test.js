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

test('Teste se página contém um heading `h2` com o texto `Page requested not found 😭`',
  () => {
    const { history } = renderWithRouter(<App />); // acessando o historico
    history.push('/qualquer rota'); // colocando uma rota errada no historico
    const notFound = screen.getByRole('heading',
      { name: /Page requested not found/i,
        level: 2,
      });
    expect(notFound).toBeInTheDocument();
  });

test('Teste se página mostra a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`.', () => {
  renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />); // acessando o historico
  history.push('/qualquer'); // colocando uma rota errada no historico
  const imgPokedexNotFound = screen
    .getByRole('img', {
      name: /pikachu crying because the page requested was not found/i });
  expect(imgPokedexNotFound).toBeInTheDocument();
  expect(imgPokedexNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
