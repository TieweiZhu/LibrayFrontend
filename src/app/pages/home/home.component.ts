import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public booklist:any[];
  public countlist:any[];
  constructor(private http:HttpClient,private router: Router) {
    this.booklist=[];
    this.countlist=[];
   }


   show(){
    var url = "http://192.168.1.2:4100/Lib/LShow.action";
    var _that = this;
    this.http.get(url).subscribe(function(data){
      console.log(data);
      var res = JSON.parse(JSON.stringify(data));
      _that.booklist = res;
    })
  }

  show2(){
    var url = "http://192.168.1.2:4100/Lib/DShow.action";
    var _that = this;
    this.http.get(url).subscribe(function(data){
      console.log(data);
      var res = JSON.parse(JSON.stringify(data));
      _that.countlist = res;
    })
  }
  convertDate(ts: string ) {
     return new Date( ts).toDateString();
  }

  ngOnInit(): void {
    this.show();
    this.show2();
  }

}
