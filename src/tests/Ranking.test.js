import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import Ranking from "../pages/Ranking";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe('Testa a tela de Ranking', () => {
    it('Testa se há um título com o texto "Ranking"', () => {
        renderWithRouterAndRedux(<Ranking />)

        const title = screen.getByTestId('ranking-title')

    expect(title).toBeInTheDocument()
    });
    it('Testa se há uma uma imagem de perfil do jogador na tela', () => {
        renderWithRouterAndRedux(<Ranking />)

        const imagesPlayers = screen.queryAllByRole('img');

        expect(imagesPlayers.length).toBeGreaterThan(0);
    });
    it('Testa se há um elemento de parágrafo com o nome do jogador, de acordo com o seu data-testid', () => {
        renderWithRouterAndRedux(<Ranking />);
        const index = 0;
        const playerName = screen.getByTestId(`player-name-${index}`);
        expect(playerName).toBeInTheDocument();
      });
    it('Testa se ao clicar no botão "Ir para o início" é redirecionado para a página inicial', async () => {
        const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');

        const btnGoHome = screen.getByRole('button', {
            name: /ir para o início/i
          })

          userEvent.click(btnGoHome);

          await waitFor(() => {
            const { pathname } = history.location;
            expect(pathname).toBe('/');
          })
    })
})