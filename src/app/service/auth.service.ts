import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  GetUserId(code: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }
  apiUrl='http://localhost:3000/user';  

  GetAll() {
    return this.http.get(this.apiUrl)
  }

  GetById(id: any){
    return this.http.get(this.apiUrl+'/'+id);
  }

  GetAllRole() {
    return this.http.get('http://localhost:3000/role')
  }

  GetAllProfile() {
    return this.http.get('http://localhost:3000/user')
  }

  GetAccessByRole(role: any, menu: any) {
    return this.http.get('http://localhost:3000/roleaccess?role='+role+'&menu='+menu)
  }

  ProceedRegistration(inputData: any) {
    return this.http.post(this.apiUrl, inputData)
  }

  UpdateUser(inputData: any, id: any) {
    return this.http.put(this.apiUrl+'/'+id, inputData)
  }

  IsLoggedIn() {
    return sessionStorage.getItem('username')!=null;
  }

  GetUserRole() {
    return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString(): '';
  }

}
