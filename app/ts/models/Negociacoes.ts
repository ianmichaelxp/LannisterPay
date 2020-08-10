class Negociacoes 
{
    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao)
    {
        this._negociacoes.push(negociacao);
    }

    listNegociacoes(): Negociacao[]
    {
        return this._negociacoes;
    }
}