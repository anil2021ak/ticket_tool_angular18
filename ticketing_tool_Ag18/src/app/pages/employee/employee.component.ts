import { Component, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  masterSrc= inject(MasterService);

  gridList: any[]=[];
  deptList: any[]=[];
  roleList: any[]=[];
  isNewView:boolean = false;

  newObj: any = {
    "employeeId": 0,
    "employeeName": "",
    "contactNo": "",
    "emailId": "",
    "deptId": 0,
    "password": "",
    "gender": "",
    "role": ""
  }

  ngOnInit(): void {
    this.getGridData();
    this.getAllDept();
    this.getAllRoles()
  }

  getAllDept() {
    this.masterSrc.getAllpCategory().subscribe((res:any)=>{
      this.deptList = res.data;
    })
  }

  getAllRoles() {
    this.masterSrc.getAllRoles().subscribe((res:any)=>{
      this.roleList = res.data;
    })
  }

  getGridData() {
    this.masterSrc.getAllEmp().subscribe((res:any)=>{
      this.gridList = res.data;
    })
  }

  save(){
    this.masterSrc.createEmp(this.newObj).subscribe((res:any)=>{
      if(res.result) {
        alert("Employee Created Success");
        this.getGridData();
      } else {
        alert(res.message)
      }
    }) 
  }
  onEdit(data: any) {
    this.newObj = data;
  }
  update() {
    this.masterSrc.updateEmp(this.newObj).subscribe((res:any)=>{
      if(res.result) {
        alert("Parent Category Updated Success");
        this.getGridData();
      } else {
        alert(res.message)
      }
    }) 
  }
  onDelete(id: number) {
    const isDelete = confirm("Are you sure want Delete");
    if(isDelete) {
      this.masterSrc.deleteEmpById(id).subscribe((res:any)=>{
        if(res.result) {
          alert("Employee Category Deleted Success");
          this.getGridData();
        } else {
          alert(res.message)
        }
      }) 
    }
  }

}
