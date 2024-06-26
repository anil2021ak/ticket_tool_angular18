import { Component, OnInit, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterOutlet],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {
  
  
  masterSrc = inject(MasterService);
  depList:any[]=[];
  newDeptObj:any = 
    {
      "deptId": 0,
      "deptName": "",
      "deptHeadEmpId": 0,
      "createdDate": ""
    }
  
  
  ngOnInit(): void {
    this.getDept();
  }

  getDept(){
    this.masterSrc.getAllDept().subscribe((res:any)=>{
      this.depList = res.data;
      // console.log(this.depList)
    })
  }

  saveDept(){
    this.masterSrc.createNewDept(this.newDeptObj).subscribe((res:any)=>{
      if(res.result){
        alert("Dept Created Sucess.!!!");
        this.getDept();
        // console.log(res)
      }
      else{
        alert(res.message)
      }
    })
  }

  onEdit(data:any){
    this.newDeptObj = data
    console.log(data)
  }

  updateDept(){
    this.masterSrc.updateDept(this.newDeptObj).subscribe((res:any)=>{
      if(res.result){
        alert("Dept Updated Sucess.!!!");
        this.getDept();
        // console.log(res)
      }
      else{
        alert(res.message)
      }
    })
  }

  onDelete(id:number){
    const isDelete = confirm("Are you sure you want to delete");
    if(isDelete){
      this.masterSrc.deleteDept(id).subscribe((res:any)=>{
        if(res.result){
          alert("Dept Deleted Sucess.!!!");
          this.getDept();
          // console.log(res)
        }
        else{
          alert(res.message)
        }
      })
    }
  }


}
