import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  sid:string;

  constructor() { 
    this.sid='';
  }
}
