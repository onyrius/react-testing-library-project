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
test('Teste se o primeiro link possui o texto `Home`', () => {
  renderWithRouter(<App />);
  const homeEl = screen.getByRole('link', { name: /home/i });
  expect(homeEl).toBeInTheDocument();
});

test('Teste se o topo da aplicação hà um conjunto fixo de links de navegação.', () => {
  renderWithRouter(<App />);
  const aboutEl = screen.getByRole('link', { name: /about/i });
  expect(aboutEl).toBeInTheDocument();
});
test('Teste se é redirecionada para a página de `Pokémons Favoritados`', () => {
  renderWithRouter(<App />);
  const favEl = screen.getByRole('link', { name: /favorite pokémons/i });
  expect(favEl).toBeInTheDocument();
});
