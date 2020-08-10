const controller = new NegociacaoControler();
document
    .querySelector('.form')
    .addEventListener('submit', controller.adiciona.bind(controller));

    console.log();
    
