import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Policy } from '../models/policy.model';


@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  url = 'http://localhost:3000/api/v1/policies';

  constructor(private http: HttpClient) { }

  addPolicy(policy: Policy) {
    return this.http.post("http://localhost:3000/api/v1/policies", policy);
  }

  getPolicyList() {
    return this.http.get<Policy[]>(this.url);
  }

  deletePolicy(id: any, currentPolicy : any) {
    return this.http.delete(`${this.url}/${id}/${currentPolicy}`)
  }
  
  updatePolicy(_id: any, policy: any) {
    return this.http.patch(`http://localhost:3000/api/v1/policies/`+_id, policy)
  }

}
