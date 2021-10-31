import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pcollection',
  templateUrl: './pcollection.component.html',
  styleUrls: ['./pcollection.component.css']
})
export class PcollectionComponent implements OnInit {

  alertSid!: string;
  form: FormGroup;
  sid:string;
  appser:AppService;
  public booklist:any[];
  key:string;
  bookid:string;
  constructor(private http:HttpClient,private router: Router,private fb: FormBuilder, private apps:AppService) {
    this.form = this.fb.group({
      file: [null]
    });
    this.sid='';
    this.appser=apps;
    console.log(this.apps.sid);
    this.booklist=[];
    this.key='';
    this.bookid='';
   }

   show(){
    var url = "http://192.168.1.2:4100/Lib/CShow.action?sid="+this.apps.sid;
    var _that = this;
    this.http.get(url).subscribe(function(data){
      console.log(data);
      var res = JSON.parse(JSON.stringify(data));
      _that.booklist = res;
    })
  }

   search(){
    var url = "http://192.168.1.2:4100/Lib/USearch.action?key="+this.key +"&sid="+this.apps.sid;
    var _that = this;
    this.http.get(url).subscribe(function(data){
      console.log(data);
     var res = JSON.parse(JSON.stringify(data));
      var status = res['status'];
      if(status == '200') {
        console.log("Search succeeded");
        _that.booklist = res['rs'];
      } else if(status == '400') {
         alert("Related resources not found！");
      }
    })
  }

  delete(dbookid: string){ 
    var url = "http://192.168.1.2:4100/Lib/CDelete.action?bookid="+dbookid;
    var _that = this;
    this.http.get(url).subscribe(function(data){
     console.log(data);
     var rs = JSON.parse(JSON.stringify(data));
      var status = rs['status'];
      if(status == '200') {
        console.log("Delete success");
        alert("Collection successfully deletedy!")
        var i = -1;
        _that.booklist.forEach(function(item, index, arr) {
          if(item.bookID == dbookid) {
              i= index;
              return;
          }
      });
    if(i > -1) {
        _that.booklist.splice(i, 1);
    }    
      } else if(status == '400') {
        console.log(rs.errmsg);
        alert("Failed to delete collect！")
     }
    },function(err){
      console.log(err);
   })
  }

  getJump(){
    this.router.navigate(['/personal']);
  }

  getJump2(){
    this.router.navigate(['/pcollection']);
  }

  getJump3(){
    this.router.navigate(['/pmanagement']);
  }

  ngOnInit(): void {
    this.show();
  }

}
