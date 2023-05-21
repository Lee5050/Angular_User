import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent implements OnInit {
  
  constructor(private builder: FormBuilder, private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
    private dialog: MatDialogRef<UpdatePopupComponent>) {
    
  }
  rolelist: any;
  editdata: any;

  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isActive: this.builder.control(false)
  });

  updateUser() {
    if(this.registerForm.valid){
      this.service.UpdateUser(this.registerForm.value.id, this.registerForm.value).subscribe(reuslt =>{
        this.toastr.success('Update Successfull!');
        this.dialog.close();
      })
    }else{
      this.toastr.warning('Invalid Selection!')
    }
  }

  ngOnInit(): void {
    this.service.GetAllRole().subscribe(result => {
      this.rolelist = result;
    })
    if(this.data.userId!=null && this.data.userId!=''){
      this.service.GetById(this.data.userId).subscribe(result =>{
        this.editdata = result;
        this.registerForm.setValue({
          id:this.editdata.id,
          name:this.editdata.name,
          email:this.editdata.email,
          password:this.editdata.password,
          role:this.editdata.role,
          gender:this.editdata.gender,
          isActive:this.editdata.isActive
        })
      })
    }
  }

}
