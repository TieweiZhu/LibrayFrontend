import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  name:string;
  introduction:string;
  category:string;
  type:string;
  uploadfile:any;
  isVisible5:boolean;
  alertSid!: string;
  form: FormGroup;
  public booklist:any[];
  bookid:string;
  key:string;
  constructor(private http:HttpClient,private router: Router,private fb: FormBuilder, private apps:AppService) { 
    this.name='';
    this.introduction='';
    this.category='';
    this.type='';
    this.uploadfile=Object;
    this.isVisible5=false;
    this.form = this.fb.group({
      file: [null]
    });

    console.log(this.apps.sid)
    this.booklist=[];
    this.bookid='';
    this.key='';
  }

  upload() {
    this.isVisible5 = true;
  }

  return() {
    this.isVisible5 = false;
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


  getUpload(){ 
    var url = "http://192.168.1.2:4100/Lib/Upload.action?name="+this.name +"&introduction="+this.introduction +"&category="+this.category +"&type="+this.type +"&sid="+this.apps.sid;
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
        alert("Uploaded successfully!")
        _that.isVisible5 = false;
      } else if(status == '400') {
        console.log(rs.errmsg);
        alert("Upload failed!")
      }
    },function(err){
      console.log(err);
    })
  }

  getJump(){
    this.router.navigate(['/admin']);
  }

  getJump2(){
    this.router.navigate(['/admin2']);
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
