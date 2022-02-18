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
test('Teste se é redirecionada para a página `Not Found`', () => {
  const { history } = renderWithRouter(<App />); // acessando o historico
  history.push('/qualquer rota'); // colocando uma rota errada no historico
  const notFound = screen.getByRole('img',
    { name: /pikachu crying because the page requested was not found/i });

  expect(notFound).toBeInTheDocument();
});
/* test('landing on a bad page shows error 404', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-inexistente');

    const pageNotFound = screen.getByText(/Página não encontrada/i);
    expect(pageNotFound).toBeInTheDocument();
  }); */
