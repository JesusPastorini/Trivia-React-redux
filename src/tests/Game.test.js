import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "../pages/Game";
import questionsResponse from "./helpers/questions";
import mockToken from "./helpers/mockToken";
import { oneQuestion, noQuestions } from "./helpers/questions";

describe('Testa a tela game', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
  });
  
  afterEach(jest.restoreAllMocks);

  it('Testa se ao carregar a página uma requisição é feita para a API de perguntas', () => {
    localStorage.setItem('token', mockToken.token)

    renderWithRouterAndRedux(<Game />)

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`https://opentdb.com/api.php?amount=5&token=${mockToken.token}`);
  });

  it('Testa se ao clicar em uma respostar aparece o botão com o texto "Next"', async () => {
    renderWithRouterAndRedux(<Game />)

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const btnAnswers = await screen.findAllByRole('button');
    userEvent.click(btnAnswers[0]);

    await waitFor(() => expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument())

  });

  it('Testa se ao receber um array de questões vazio é redirecionado para a página Login',async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(noQuestions),
    });

    const { history } = renderWithRouterAndRedux(<Game />)

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
  });

  it('Testa se ao marcar uma resposta e clicar no botão com texto "Next", é redirecionado para a próxima pergunta', async () => {
    renderWithRouterAndRedux(<Game />)

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const btnAnswers = await screen.findAllByRole('button');
    userEvent.click(btnAnswers[0]);

    await waitFor(() => {
    const btnNext = screen.getByRole('button', { name: /next/i });
    userEvent.click(btnNext);
    })

    const secondQuestion = screen.getByText(/In quantum physics, which of these theorised sub-atomic particles has yet to be observed/i);

    expect(secondQuestion).toBeInTheDocument();
  });

  it('Testa se ao responder a última pergunta e clicar no botão com texto "Next" é redirecionado para a rota /feedback', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneQuestion),
    });

    const { history } = renderWithRouterAndRedux(<Game />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const btnAnswers = await screen.findAllByRole('button');
    userEvent.click(btnAnswers[0]);

    const btnNext = await screen.findByRole('button', { name: /next/i });
  
    userEvent.click(btnNext);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/feedback')
    });
  });

  it('Testa se ao responder corretamente perguntas de nivél médio e difícil o placar é alterado', async () => {
    renderWithRouterAndRedux(<Game />)

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const btnAnswersFirstQuestion = await screen.findAllByRole('button');
    userEvent.click(btnAnswersFirstQuestion[0]);

    await waitFor(() => {
    const btnNext = screen.getByRole('button', { name: /next/i });
    userEvent.click(btnNext);
    })

    const secondQuestion = screen.getByText(/In quantum physics, which of these theorised sub-atomic particles has yet to be observed/i);
    expect(secondQuestion).toBeInTheDocument();

    const btnCorrectAnswerSecondQuestion = await screen.findByText(/Graviton/i);
    userEvent.click(btnCorrectAnswerSecondQuestion);

    await waitFor(() => {
      const btnNext = screen.getByRole('button', { name: /next/i });
      userEvent.click(btnNext);
      })

    const thirdQuestion = screen.getByText(/Generally, which component of a computer draws the most power/i);
    expect(thirdQuestion).toBeInTheDocument();

    const btnCorrectAnswerThirdQuestion = await screen.findByText(/Video Card/i);
    userEvent.click(btnCorrectAnswerThirdQuestion);

    await waitFor(() => {
      const btnNext = screen.getByRole('button', { name: /next/i });
      userEvent.click(btnNext);
      })

    const fourthQuestion = screen.getByText(/What is the most expensive weapon in Counter-Strike: Global Offensive/i);
    expect(fourthQuestion).toBeInTheDocument();
  });

  it('Testa se o tempo para responder as questões atinge o tempo de 25 segundos', async () => {
    renderWithRouterAndRedux(<Game />);
    const timer = await screen.findByText('Tempo: 25', {}, {timeout: 6000});

    expect(timer).toBeInTheDocument()
  }, 10000);

  it('Testa se o tempo para responder as questões atinge o tempo de 0 segundos', async () => {
    renderWithRouterAndRedux(<Game />);
    const timer = await screen.findByText('Tempo: 0', {}, {timeout: 31000});
    expect(timer).toBeInTheDocument()
  }, 31000);
});