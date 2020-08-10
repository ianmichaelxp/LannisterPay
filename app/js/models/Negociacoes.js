class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    listaNegociacoes() {
        return [].concat(this._negociacoes);
    }
}
