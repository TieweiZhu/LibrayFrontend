import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin2',
  templateUrl: './admin2.component.html',
  styleUrls: ['./admin2.component.css']
})
export class Admin2Component implements OnInit {

  account:string;
  password:string;

  constructor(private http:HttpClient,private router: Router, private fb: FormBuilder) {

    this.account='';
    this.password='';

  }

  getAChange(){
    var url = "http://192.168.1.2:4100/Lib/AChange.action?account="+this.account +"&password="+this.password;
    var _that = this;
    this.http.get(url) .subscribe(function(data){
      console.log(data);
      var rs = JSON.parse(JSON.stringify(data));
      var status = rs['status'];
      if(status == '200') {
        console.log("User password changed successfully");
        alert("User password changed successfully!");
        _that.router.navigate(['/admin2']);
      } else if(status == '400') {
        console.log(rs.errmsg);
        alert("User password change failed!")
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

  ngOnInit(): void {
  }

}
