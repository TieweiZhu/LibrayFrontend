import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pmanagement',
  templateUrl: './pmanagement.component.html',
  styleUrls: ['./pmanagement.component.css']
})
export class PmanagementComponent implements OnInit {
  oldpassword:string;
  newpassword:string;
  alertSid!: string;
  form: FormGroup;
  sid:string;
  appser:AppService;
  constructor(private http:HttpClient,private router: Router,private fb: FormBuilder, private apps:AppService) { 
    this.oldpassword='';
    this.newpassword='';
    this.form = this.fb.group({
      file: [null]
    });
    this.sid='';
    this.appser=apps;
    console.log(this.apps.sid)
  }


  getChange(){ 
    var url = "http://192.168.1.2:4100/Lib/Change.action?oldpassword="+this.oldpassword +"&newpassword="+this.newpassword +"&sid="+this.apps.sid;
    var _that = this;
    this.http.get(url).subscribe(function(data){
      console.log(data);
      var rs = JSON.parse(JSON.stringify(data));
      var status = rs['status'];
      if(status == '200') {
        console.log("Change password success");
        alert("Password changed successfully!");
        _that.router.navigate(['/personal']);
      } else if(status == '400') {
        console.log(rs.errmsg);
        alert("Failed to change password!")
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
  }

}
