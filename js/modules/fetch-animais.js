import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {
  //Cria a div contendo informacoes
  //com o total de animais
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  //Preenche cada animal no Dom
  const numerosGrid = document.querySelector(target);
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }
  // anima os números de cada animal
  function animaAnimalNumeros() {
    const animanumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animanumeros.init();
  }

  //Puxa os animais atraves de um arquivo json
  // e cria cada animal utilizando createAnimal

  async function criarAnimais() {
    try {
      //Fetch espera resposta e Transforma resposta em json
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();

      //Após a transformação de json, ativa as funções
      //para preencher e animar os números

      animaisJSON.forEach(animal => preencherAnimais(animal));
      animaAnimalNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }
  return criarAnimais();
}
