import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model'; 

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:3000/api/v1/employees';

  constructor(private http: HttpClient) { }

  addEmployee(emp: Employee) {
    return this.http.post("http://localhost:3000/api/v1/employees", emp);
  }

  getEmployeeList() {
    return this.http.get<Employee[]>(this.url);
  }

  deleteEmployee(id: any,  currentOrg : any) {
    return this.http.delete(`${this.url}/${id}/${currentOrg}`)
  }
  updateEmployee(_id:any, emp: any) {
    return this.http.patch(`http://localhost:3000/api/v1/employees/`+_id, emp)
  }

}
