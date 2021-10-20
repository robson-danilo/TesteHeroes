import { Component } from '@angular/core';
import { ModelService } from '../service/model.service';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private conect: ModelService,
    private http: HTTP) {
      

  }



}
