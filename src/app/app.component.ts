import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './shared';
import { AngularFireDatabase } from '@angular/fire/database';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private connected$: Observable<any>;
  private ready: boolean = false;
  private debug: boolean = !(process.env.ENV === 'build');
  private __version: string = process.env.VERSION;
  
  constructor(private api: ApiService, private db: AngularFireDatabase) {
    this.connected$ = db.object('/.info/connected').valueChanges();
    this.connected$.subscribe(d => this.ready = this.ready || d);
  }

  checkLongPolling() {
    return localStorage.getItem("FORCE_LONGPOLLING") === "";
  }

  enableLongPolling(enable: boolean) {
    if (enable)
      localStorage.setItem('FORCE_LONGPOLLING', "");
    else
      localStorage.removeItem('FORCE_LONGPOLLING');
    window.location.reload();
  }
}
