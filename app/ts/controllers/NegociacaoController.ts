import { Negociacoes, Negociacao, NegociacaoParcial} from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { domInject } from '../helpers/decorators/domInject';
import { throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index'


export class NegociacaoController
{
    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;    

    private _negociacaoService = new NegociacaoService();
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor()
    {
        this._negociacoesView.update(this._negociacoes);
    }


    @throttle()
    adiciona()
    {
        const t1 = performance.now();
        const negociacao = new Negociacao(
            new Date (this._inputData.val().replace(/-/g, ',')), 
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        
        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Dívida adicionada com sucesso!')
        imprime(negociacao, this._negociacoes);
        const t2 = performance.now();
        console.log(`tempo de ${t2 - t1}ms`);
        
    }

    @throttle()
    importarDados()
    {
        //isOk HandlerFunction
        function isOk(res: Response)
        {
            if(res.ok)
            {                
                return res;
            }
            else
            {
                throw new Error(res.statusText)
            }
        }

        this._negociacaoService
            .obterNegociacoes(isOk)
            .then((negociacoes: Negociacao[]) => 
                {   
                    negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
                    this._negociacoesView.update(this._negociacoes);
                }
        );            
    }
}

