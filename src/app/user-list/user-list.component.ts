import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  displayedColumns: string[] = ['username', 'name', 'email', 'status', 'role', 'action'];

  constructor(private service: AuthService, private dialog: MatDialog) {
    this.LoadUser();
  }

  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  LoadUser() {
    this.service.GetAll().subscribe(result =>{
      this.userList = result;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  UpdateUser(id: any){
    const popup = this.dialog.open(UpdatePopupComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        userId: id
      }
    })
    popup.afterClosed().subscribe(result =>{
      this.LoadUser()
    })
  }

  opendialog() {
    
  }

}
