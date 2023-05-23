import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { act } from "react-dom/test-utils";
import mockToken from "./helpers/mockToken";

const invalidEmail = 'teste.@teste.com';
const validEmail = 'email@email.com';
const invalidName = 'Aa';
const validName = 'José';
const mockPlayer = {
  player: {
    name: 'José',
    assertions: 0,
    score: 0,
    gravatarEmail: 'email@email.com',
  },
};

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockToken),
  });
});

afterEach(jest.restoreAllMocks);

describe('Testa a tela de Login', () => {
  it('Testa se há dois inputs na tela', () => {
    renderWithRouterAndRedux(<App />)

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
  });

  it('Testa se há um botão com o texto "Play" e outro com texto "Configurações"', () => {
    renderWithRouterAndRedux(<App />)
    
    const btnPlay = screen.getByRole('button', { name: /play/i });
    const btnConfig = screen.getByRole('button', { name: /configurações/i });

    expect(btnPlay).toBeInTheDocument()
    expect(btnConfig).toBeInTheDocument()
  });

  it('Testa se o botão "Play" está desabilitado ao carregar a página', () => {
    renderWithRouterAndRedux(<App />)
    
    const btnPlay = screen.getByRole('button', { name: /play/i });

    expect(btnPlay).toHaveAttribute('disabled', '')
  });

  it('Testa se o botão "Play" está desabilitado se um email estiver em um formato inválido', () => {
    renderWithRouterAndRedux(<App />)
    
    const btnPlay = screen.getByRole('button', { name: /play/i });
    const inputEmail = screen.getByTestId('input-gravatar-email');
    
    act(() => {userEvent.type(inputEmail, invalidEmail)});

    expect(btnPlay).toHaveAttribute('disabled', '')
  });

  it('Testa se o botão "Play" está desabilitado se o nome possuir menos de 3 caracteres', () => {
    renderWithRouterAndRedux(<App />)
    
    const btnPlay = screen.getByRole('button', { name: /play/i });
    const inputName = screen.getByTestId('input-player-name');

    
    act(() => {userEvent.type(inputName, invalidName)});

    expect(btnPlay).toHaveAttribute('disabled', '')
  });
  
  it('Testa se o botão "Play" é habilitado ao preencher o email e o nome', () => {
    renderWithRouterAndRedux(<App />)
    
    const btnPlay = screen.getByRole('button', { name: /play/i });
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');

    act(() => {userEvent.type(inputEmail, validEmail)});

    act(() => {userEvent.type(inputName, validName)});

    expect(btnPlay).not.toHaveAttribute('disabled')
  });
  
  it('Testa se ao clicar no botão de Configurações é redirecionado para a rota /config', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    
    const btnConfig = screen.getByRole('button', { name: /configurações/i });

    act(() => {userEvent.click(btnConfig)});

    const { pathname } = history.location;

    expect(pathname).toBe('/config')
   
  });

  // it('Testa se ao clicar no botão de Play é feita uma requisição para a API', () => {

  // });
  
  // it('Testa se ao clicar no botão de Play o token é salvo no local storage', () => {

  // });

  it('Testa se ao clicar no botão de Play o nome e email são salvos no estado global', async () => {
    const { store } = renderWithRouterAndRedux(<App />, mockPlayer, '/game')
        
    await waitFor(() => {
      console.log(store.getState());
      expect(store.getState().player.gravatarEmail).toBe(validEmail)
    })

    await waitFor(() => {
      expect(store.getState().player.name).toBe(validName)
    })

  });

  it('Testa se ao clicar no botão de Play é redirecionado para a rota /game', async () => {
    const { history } = renderWithRouterAndRedux(<App />)
  
    const btnPlay = screen.getByRole('button', { name: /play/i });
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    
    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputName, validName);
    userEvent.click(btnPlay);
    
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game');
    })
  });
});