import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  name:string;
  introduction:string;
  category:string;
  type:string;
  uploadfile:any;
  isVisible4:boolean;
  alertSid!: string;
  form: FormGroup;
  sid:string;
  appser:AppService;
  public booklist:any[];
  key:string;
  bookid:string;
  constructor(private http:HttpClient,private router: Router,private fb: FormBuilder, private apps:AppService) { 
    this.name='';
    this.introduction='';
    this.category='';
    this.type='';
    this.uploadfile=Object;
    this.isVisible4= false;
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

  upload() {
    this.isVisible4 = true;
  }

  return(){
    this.isVisible4 = false;
  }

  changed(event: any) {
    var e =  (event.target as HTMLInputElement);
    if(e != null) {
      const fs = e.files;
      if(fs != null) {
      const f = fs[0]
      this.form.patchValue({
        file: f
      });
      var fm = this.form.get('file');
      if(fm != null)
        fm.updateValueAndValidity();
      }
    }
  }


  getUUpload(){ 
    var url = "http://192.168.0.106:4100/Lib/UUpload.action?name="+this.name +"&introduction="+this.introduction +"&category="+this.category +"&type="+this.type +"&sid="+this.apps.sid;
    var _that = this;

    var headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    var formData = new FormData();
    formData.append("file",  _that.form.get("file")?.value);
    this.http.post(url, formData) .subscribe(function(data){
      console.log(data);
      var rs = JSON.parse(JSON.stringify(data));
      var status = rs['status'];
      if(status == '200') {
        console.log("Upload success");
        alert("Uploaded successfully！")
        _that.isVisible4 = false;
      } else if(status == '400') {
        console.log(rs.errmsg);
        alert("Upload failed！")
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

  show(){
    var url = "http://192.168.1.2:4100/Lib/PShow.action?sid="+this.apps.sid;
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
    var url = "http://192.168.1.2:4100/Lib/Delete.action?bookid="+dbookid;
    var _that = this;
    this.http.get(url).subscribe(function(data){
      console.log(data);
      var rs = JSON.parse(JSON.stringify(data));
      var status = rs['status'];
      if(status == '200') {
        console.log("Delete success");
        alert("Resource deleted successfully!")
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
        alert("Failed to delete resource！")
      }
    },function(err){
      console.log(err);
    })
  }

  ngOnInit(): void {
    this.show();
  }

}
