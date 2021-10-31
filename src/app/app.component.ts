import { Component, forwardRef, Host, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { style } from '@angular/animations';
import { NgClass, NgStyle } from '@angular/common';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AppService]
})
export class AppComponent {
  title = 'Library';
  menu = [{
    label: 'Home',
    path: '/home'
  },
  {
    label : 'Resource',
    path: '/resource'
  },
]

account :string;
password:string;
raccount:string;
username:string;
rpassword:string;
email:string;
aaccount:string;
apassword:string;
isVisible:boolean;
isVisible2:boolean;
isVisible3:boolean;
sid:string;
appser:AppService;
constructor(private http:HttpClient,private router: Router, private apps:AppService) {
  this.account='';
  this.password='';
  this.raccount='';
  this.username='';
  this.rpassword='';
  this.email='';
  this.aaccount='';
  this.apassword='';
  this.isVisible=false;
  this.isVisible2=false;
  this.isVisible3=false;
  this.sid='';
  this.appser=apps;
}


show() {
  this.isVisible = true;
}

show2() {
  this.isVisible2 = true;
}

show3() {
  this.isVisible3 = true;
}

getLogin(){ 
  var url = "http://192.168.1.2:4100/Lib/Login.action?account="+this.account +"&password="+this.password;
  
  var _that = this;
  this.http.get(url).subscribe(function(data){
    console.log(data);
    var res = JSON.parse(JSON.stringify(data));
    var status = res['status'];
    if(status == '200') {
      console.log("login success");
      _that.sid = res['sid'];
      _that.appser.sid = _that.sid;
      _that.router.navigate(['/personal']);
      _that.isVisible = false;
    } else if(status == '400') {
      console.log(res.errmsg);
       alert("Incorrect account or password！");
    }
  },function(err){
    console.log(err);
  })
}

getSignup(){ 
   var url = "http://192.168.1.2:4100/Lib/Signup.action?account="+this.raccount +"&username="+this.username +"&password="+this.rpassword +"&email="+this.email;
   var _that = this;
   this.http.get(url).subscribe(function(data){
     console.log(data);
     var rs = JSON.parse(JSON.stringify(data));
     var status = rs['status'];
     if(status == '200') {
       console.log("Signup success");
       alert("Registration success!")
       _that.router.navigate(['/personal'])
       _that.isVisible2 = false;
     } else if(status == '400') {
       console.log(rs.errmsg);
       alert("Account or Name is already used！")
     }
   },function(err){
     console.log(err);
   })
 }

 getAdminLogin(){ 
  var url = "http://192.168.1.2:4100/Lib/AdminLogin.action?account="+this.aaccount +"&password="+this.apassword;
  var _that = this;
  this.http.get(url).subscribe(function(data){
    console.log(data);
    var res = JSON.parse(JSON.stringify(data));
    var status = res['status'];
    if(status == '200') {
      console.log("login success");
      _that.sid = res['sid'];
      _that.appser.sid = _that.sid;
      _that.router.navigate(['/admin'])
      _that.isVisible3 = false;
    } else if(status == '400') {
      console.log(res.errmsg);
       alert("Incorrect account or password！");
    }
  },function(err){
    console.log(err);
  })
}

getJumpHome(){
  this.router.navigate(['/home']);
}

getJumpResource(){
  this.router.navigate(['/resource']);
}

getJumpPersonal(){
  this.router.navigate(['/personal']);
}

}
