import { Negociacoes, Negociacao} from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { domInject } from '../helpers/decorators/domInject';


export class NegociacaoController
{
    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;    

    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor()
    {
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event)
    {
        const t1 = performance.now();
        event.preventDefault();
        const negociacao = new Negociacao(
            new Date (this._inputData.val().replace(/-/g, ',')), 
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );
        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Dívida adicionada com sucesso!')
        const t2 = performance.now();
        console.log(`tempo de ${t2 - t1}ms`);
        
    }

    importarDados()
    {
        alert('oi');
    }
}