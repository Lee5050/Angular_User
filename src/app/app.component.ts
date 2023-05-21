import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'UserManagement';
  ismenurequired=false;
  isadmin=false;

  constructor(private router: Router, private service: AuthService) {
    
  }

  ngDoCheck(): void {
    let currenturl = this.router.url;
    if(currenturl == '/login' || currenturl == '/register'){
      this.ismenurequired = false;
    }else{
      this.ismenurequired = true;
    }
    if(this.service.GetUserRole()==='admin'){
      this.isadmin = true;
    }else{
      this.isadmin = false;
    }
    }
  }


