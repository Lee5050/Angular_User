import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  displayedColumns: string[] = ['username', 'name', 'email', 'status', 'role', 'action'];

  constructor(private service: AuthService, private toastr: ToastrService) {
    this.SetAccessPermission();
    this.LoadProfile();
  }

  profileList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  accessdata: any;
  haveEdit = false;
  haveAdd = false;
  haveDelete = false;

  LoadProfile() {
    this.service.GetAllProfile().subscribe(result =>{
      this.profileList = result;
      this.dataSource = new MatTableDataSource(this.profileList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  SetAccessPermission(){
    this.service.GetAccessByRole(this.service.GetUserRole(),'user').subscribe(result => {
      this.accessdata = result;
      //console.log(this.accessdata)

      if(this.accessdata.length>0){
        this.haveAdd=this.accessdata[0].haveAdd;
        this.haveEdit=this.accessdata[0].haveEdit;
        this.haveDelete=this.accessdata[0].haveDelete;
      }

    })
  }

  UpdateProfile(id: any) {
    if(this.haveEdit){
      this.toastr.success("Successfull!")
    }else{
      this.toastr.warning("No Access!")
    }

  }
  DeleteProfile(id: any){
    if(this.haveDelete){
      this.toastr.success("Successfull!")
    }else{
      this.toastr.warning("No Access!")
    }
  }

  AddUser() {
    if(this.haveAdd){
      this.toastr.success("Successfull!")
    }else{
      this.toastr.warning("No Access!")
    }
  }

}
