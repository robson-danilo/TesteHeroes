import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InicioPage implements OnInit {
  headers = {
    //'Content-Type': 'application/x-www-form-urlencoded',
    'accessKey': '394772d23dfb455a9fc5ee31ce8ee53a'
  };
  obj: any = new Array();
  heroes: any = new Array();
  categorias: any = new Array();
  public columns: any;
  filteredData = [];
  columnsWithSearch: string[] = [];
  registroHerois: any = new Array();


  constructor(private http: HTTP,
    private store: Storage) {

  }

  updateList(event) {
    let filter = event.target.value.toLowerCase();
    this.heroes = this.filteredData.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++) {
        var colValue = item[this.columnsWithSearch[i]];
        if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
          return true;
        }
      }
    });
  }

  ngOnInit() {
    this.buscarCategorias();
    this.buscarheroes();
  }

  ionViewWillEnter(){
    this.store.get('heroesOff').then((val) => {
      this.registroHerois = val;
      this.EnviarDadosHeroi();
    });
  }

  EnviarDadosHeroi() {
    var registros = this.registroHerois;
    this.registroHerois = new Array();

    if (registros != null && registros.length > 0) {
      registros.forEach(element => {
        this.http.post('https://heroes.globalthings.net/api/Heroes', {
          Name: element.Name,
          CategoryId: element.CategoryId,
          Active: true
        }, this.headers)
          .then(data => {
            /* alert("Sucesso " +data);
            alert(JSON.stringify(data)); */
            this.buscarheroes();
          })
          .catch(error => {
            var registroHeroie = {
              Name: element.Name,
              CategoryId: element.CategoryId,
              Active: true
            }
            this.registroHerois.push(registroHeroie);
            this.store.set('heroesOff', this.registroHerois);
            /* alert("Error"+ error);
            alert(JSON.stringify(error)); */
          });
      });
    }
    var hora = 1000 * 60;
    setTimeout(() => {
      this.EnviarDadosHeroi()
    }, hora);
  }

  buscarCategorias() {
    this.http.get('https://heroes.globalthings.net/api/Category', {}, this.headers)
      .then(data => {
        this.categorias = (eval("(" + data.data + ")"));
        this.store.set('categorias', this.categorias);
      })
      .catch(error => {
        console.log(error);
        this.store.get('categorias').then((val) => {
          this.categorias = val;
        });
      });
  }

  buscarheroes() {
    this.http.get('https://heroes.globalthings.net/api/Heroes', {}, this.headers)
      .then(response => {
        this.heroes = (eval("(" + response.data + ")"));
        this.filteredData = this.heroes;
        this.columnsWithSearch = Object.keys(this.heroes[0]);
      })
      .catch(error => {
        console.log(error);

      });
  }

  async cadastrar(form) {
    /* alert(JSON.stringify(this.obj));
    alert(this.obj.nome);
    alert(this.obj.categoria); */

    if (this.obj.nome == undefined) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo obrigatorio!',
        text: 'Nome é obrigatorio!'
      })
      return;
    }

    if (this.obj.categoria == undefined) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo obrigatorio!',
        text: 'Categoria é obrigatoria!'
      })
      return;
    }

    var nome = this.obj.nome;
    var idCategoria = this.obj.categoria;

    this.http.post('https://heroes.globalthings.net/api/Heroes', {
      Name: nome,
      CategoryId: idCategoria,
      Active: true
    }, this.headers)
      .then(data => {
        Swal.fire(
          'Herói cadastrado com sucesso!',
          '',
          'success'
        )
        /* alert("Sucesso " +data);
        alert(JSON.stringify(data)); */
        this.buscarheroes();
      })
      .catch(error => {
        Swal.fire({
          icon: 'warning',
          title: 'Sem conexão!',
          text: 'Sem conexão com a internet para cadastrar um novo herói, devido a isso irá ser armazenado esse herói para que quando a conexão voltar, realizar a tentativa de cadastro novamente!'
        })
        var registroHeroie = {
          Name: nome,
          CategoryId: idCategoria,
          Active: true
        }
        this.registroHerois.push(registroHeroie);
        this.store.set('heroesOff', this.registroHerois);
        /* alert("Error"+ error);
        alert(JSON.stringify(error)); */

      });

  }

}
