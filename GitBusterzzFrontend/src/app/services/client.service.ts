import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = 'http://localhost:3000/api/v1/clients';

  constructor(private http: HttpClient) { }

  addClient(client: Client) {
    console.log("In client Service" + client);
    return this.http.post(this.url, client);
  }

  getClientList() {
    return this.http.get<Client[]>(this.url);
  }

  deleteClient(id: any) {
    return this.http.delete(`${this.url}/${id}`)
  }
  // updateClient(client: Client) {
  //   return this.http.put(`${this.url}/${client._id}`, client)
  // }

  updateClient(_id:any, client: any) {
    return this.http.patch('http://localhost:3000/api/v1/clients/'+_id, client)
  }

}
