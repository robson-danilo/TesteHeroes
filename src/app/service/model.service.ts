import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})

export class cadastrarNovoHeroi {
  public nome: string;
  public categoria: string;
}



export class ModelService {


  /* let url = 'https://api.brasil.io/v1/dataset/covid19/caso/data/?format=json&is_last=True&place_type=state';

    var header = {
      headers: new HttpHeaders()
        //.set('Content-type', `application/json`),
        //.set('Authorization', '00eac30fb28ecae5fad0469dca969e01b35b47bf')
        .set("Authorization", "Token 00eac30fb28ecae5fad0469dca969e01b35b47bf")
    } */


  private url = 'https://heroes.globalthings.net/api/Category';
  private headers = new HttpHeaders().set('accessKey', '394772d23dfb455a9fc5ee31ce8ee53a');
  constructor(private http: HttpClient, private http2: HTTP) { }
  listarCategorias() {
    let headers = {
      'accessKey': '394772d23dfb455a9fc5ee31ce8ee53a'
  };
    return this.http.get(this.url, {headers: headers}).toPromise();
  }

  listarCategorias2() {
    return this.http2.get(this.url, {}, {});
  }

  




}
