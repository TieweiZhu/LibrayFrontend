import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

public booklist:any[];
key:string;
alertSid!: string;
form: FormGroup;
sid:string;
appser:AppService;
bookid:string;
  constructor( private http:HttpClient,private router: Router, private fb: FormBuilder, private apps:AppService) {
    this.booklist=[];
    this.key='';
    this.form = this.fb.group({
      file: [null]
    });
    this.sid='';
    this.appser=apps;
    console.log(this.apps.sid);
    this.booklist=[];
    this.bookid='';
  }

  show(){
    var url = "http://192.168.1.2:4100/Lib/Show.action";
    var _that = this;
    this.http.get(url).subscribe(function(data){
      console.log(data);
      var res = JSON.parse(JSON.stringify(data));
      _that.booklist = res;
    })
  }

  search(){
    var url = "http://192.168.1.2:4100/Lib/Search.action?key="+this.key;
    var _that = this;
    this.http.get(url).subscribe(function(data){
      console.log(data);
      var res = JSON.parse(JSON.stringify(data));
      _that.booklist = res['rs'];
    })
  }

  collect(cbookid:string,cname:string,cintroduction:string,ccategory:string,ctype:string){
    var url = "http://192.168.1.2:4100/Lib/Collect.action?bookid="+cbookid + "&sid="+this.apps.sid + "&name="+cname + "&introduction="+cintroduction + "&category="+ccategory + "&type="+ctype;
    var _that = this;
    this.http.get(url).subscribe(function(data){
      console.log(data);
      var res = JSON.parse(JSON.stringify(data));
      var status = res['status'];
    if(status == '200') {
      console.log("Collection success!");
      alert("Collection success！");
    } else if(status == '400') {
      console.log(res.errmsg);
       alert("Please login first！");
    }
  },function(err){
    console.log(err);
  })
}

download(dbookid:string){
  var url = "http://192.168.1.2:4100/Lib/Download.action?bookid="+dbookid;
    return this.http.get(url, { headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, responseType: 'blob', observe: 'response' })
      .pipe().subscribe({
        next: (response: any) => {
          let fileName = 'file';
          const contentDisposition = response.headers.get('Content-Disposition');
          if (contentDisposition) {
            const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = fileNameRegex.exec(contentDisposition);
            if (matches != null && matches[1]) {
              fileName = matches[1].replace(/['"]/g, '');
            }
          }
          const fileContent = response.body;
          const blob = new Blob([fileContent], { type: 'application/octet-stream' });
          saveAs(blob, fileName);
        },
        error: (error) => {
          console.log(error);
        }
      });
}

  ngOnInit(): void {
    this.show();
  }
}

