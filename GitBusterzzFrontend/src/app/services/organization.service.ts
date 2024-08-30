import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Organization } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  url= 'http://localhost:3000/api/v1/organizations';

  constructor(private http: HttpClient) { }

  addOrganization(org: Organization){
    return this.http.post(this.url, org);
  }

  getOrganizationList(){
    return this.http.get<Organization[]>(this.url);
  }

  deleteOrganization(id:any ){
    return this.http.delete(`${this.url}/${id}`)
  }

  updateOrganization(_id:any, org: any){
    return this.http.patch('http://localhost:3000/api/v1/organizations/'+_id , org)
  }
}
