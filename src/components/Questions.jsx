import React, { Component } from 'react';
import './Questions.css';

class Questions extends Component {
  state = {
    questions: [],
    currentQuestionIndex: 0,
    answered: false,
    answersColor: [], // Array para armazenar as cores das respostas
  };

  componentDidMount() {
    this.fetchApi();
  }

  // Função para fazer a requisição das perguntas da API
  fetchApi = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();
      const questions = data.results.map((question) => ({
        ...question,
        answers: this.shuffleAnswers([...question.incorrect_answers,
          question.correct_answer]),
      }));// Une a opção correta com incorreta e envia para embaralhar
      this.setState({ questions });
    } catch (error) {
      console.error('Erro ao carregar perguntas:', error);
    }
  };

  // Função para embaralhar as respostas
  shuffleAnswers = (answers) => {
    const shuffledAnswers = [...answers];
    for (let i = shuffledAnswers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    return shuffledAnswers;
  };

  // Função para lidar com o clique em uma resposta
  handleAnswerClick = (answer) => {
    const { questions, currentQuestionIndex } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;

    // Definir as cores das respostas com base na resposta escolhida
    const answersColor = currentQuestion.answers.map((a) => {
      if (a === currentQuestion.correct_answer) {
        return isCorrect ? 'correct-answer' : '';
      } if (a === answer) {
        return 'wrong-answer';
      }
      return '';
    });

    // Atualizar o estado com a resposta escolhida e as cores das respostas
    this.setState({
      answered: true,
      answersColor,
    });
    const noMagic = 1000;
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        // Avançar para a próxima pergunta após um intervalo de tempo
        this.setState((prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          answered: false,
          answersColor: [], // Limpar as cores das respostas
        }));
      }, noMagic);
    } else {
      console.log('Fim do jogo');
    }
  };

  // Função para renderizar a pergunta atual
  renderCurrentQuestion() {
    const { questions, currentQuestionIndex, answered, answersColor } = this.state;
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div>
        <h2 data-testid="question-category">{currentQuestion.category}</h2>
        <p data-testid="question-text">{currentQuestion.question}</p>
        <div data-testid="answer-options">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={ index }
              className={ answered ? answersColor[index] : '' }
              data-testid={ answer === currentQuestion.correct_answer
                ? 'correct-answer' : `wrong-answer-${index}` }
              onClick={ () => this.handleAnswerClick(answer) }
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { questions, currentQuestionIndex } = this.state;

    let content;

    if (questions.length === 0) {
      content = <div>Loading...</div>;
    } else if (currentQuestionIndex >= questions.length) {
      content = <div>Game Over</div>;
    } else {
      content = this.renderCurrentQuestion();
    }

    return <div>{content}</div>;
  }
}

export default Questions;
