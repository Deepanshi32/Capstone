import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../models/client.model';
import { Policy } from '../models/policy.model';
import { ClientService } from '../services/client.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { PolicyService } from '../services/policy.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  private _success = new Subject<string>();

  clientForm: FormGroup;
  policyForm: FormGroup;
  showModal: boolean = false;
  showPolicyModal: boolean = false;
  editMode: boolean = false;
  clients: Client[];
  policies: Policy[];
  staticAlertClosed = false;
  successMessage = '';
  deleteId = '';
  currentClientData = '';
  currentClientPolicyData = '';
  clientPolicyData = [];
  editPolicyData = [];
  currentPolicy = '';
  showViewPolicy: boolean = false;
  deletePolicyId = '';
  currentDeleteClient = '';
  clientObj: Client = new Client();
  policyObj: Policy = new Policy();

  constructor(private fb: FormBuilder, private clientService: ClientService, private notifyService: NotificationService, private policyService: PolicyService) { }

  showToasterSuccess() {
    this.notifyService.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
  }

  showToasterError() {
    this.notifyService.showError("Something is wrong", "ItSolutionStuff.com")
  }

  showToasterInfo() {
    this.notifyService.showInfo("This is info", "ItSolutionStuff.com")
  }

  showToasterWarning() {
    this.notifyService.showWarning("This is warning", "ItSolutionStuff.com")
  }


  ngOnInit(): void {
    this.getClients();
    
    this.clientForm = this.fb.group({
      _id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      policies: []
    })

    this.policyForm = this.fb.group({
      _id: [''],
      PolicyName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      ClientName: [''],
      Residance: ['', [Validators.required]],
      Dependants: ['', [Validators.required]],
      Premium: ['', [Validators.required, Validators.pattern("^[0-9]{3,6}$")]],
      Description: [''],
      Age: ['', [Validators.required]],
    })



  }

  getClients() {
    this.clientService.getClientList().subscribe((res: Client[]) => {
      console.log(res);
      this.clients = res;
    })
  }

  getPolicies() {
    this.policyService.getPolicyList().subscribe((res: Policy[]) => {
      console.log(res);
      this.policies = res;
    })
  }


  onEditClient(client: any) {
    this.clientObj.id = client._id;
    this.editMode = true;
    this.showModal = true;
    this.clientForm.patchValue(client);
    this.clientPolicyData = this.clientForm.value;
    console.log(this.clientPolicyData);
  }

  onEditPolicy(policy: any) {
    this.policyObj.id = policy._id;
    this.editMode = true;
    this.showModal = true;
    this.policyForm.patchValue(policy);
    this.editPolicyData = this.policyForm.value;
    console.log(this.editPolicyData);
  }

  onClientUpdate() {
    this.clientObj.name = this.clientForm.value.name;
    this.clientObj.policies= this.clientForm.value.policies;
    this.clientService.updateClient(this.clientObj.id, this.clientObj).subscribe(
      res => {
        this.notifyService.showSuccess("Client Updated Successfully !!", "😎")
        console.log('In update service')
        this.getClients();
        location.reload();
      },
      err => {
        console.log(err)
      }
    )

  }

  onPolicyUpdate() {
    // console.log('In update service')
    // this.policyForm.patchValue({ ClientName: this.currentClientData })
    this.policyObj.Age = this.policyForm.value.Age;
    this.policyObj.ClientName = this.policyForm.value.ClientName;
    this.policyObj.Dependants = this.policyForm.value.Dependants;
    this.policyObj.Description = this.policyForm.value.Description;
    this.policyObj.PolicyName = this.policyForm.value.PolicyName;
    this.policyObj.Premium = this.policyForm.value.Premium;
    this.policyObj.Residance = this.policyForm.value.Residance;
    this.policyService.updatePolicy(this.policyObj.id, this.policyObj).subscribe(
      res => {
        this.notifyService.showSuccess("Policy Updated Successfully !!", "😎")
        console.log('In update service')
        console.log(this.policyObj)
        
        location.reload();
      },
      err => {
        console.log(err)
      }
    )

  }

  onClientSubmit() {
    if (this.clientForm.valid) {

      console.warn("calling add client");
      console.log(this.clientForm.value);
      this.clientService.addClient(this.clientForm.value).subscribe(
        res => {
          this.getClients();
          console.log(this.clients);
          this.notifyService.showSuccess("Client Added Successfully !!", "😎")
          location.reload();
        },
        err => {
          console.log(err)
        }
      )

    }
    else {
      err => {
        console.log(err);
      }
    }
  }

  onPolicySubmit(id) {
    // console.log(this.policyForm.value);
    this.policyForm.patchValue({ ClientName: this.currentClientData })
    // this.currentClientPolicyData = id;
    this.policyService.addPolicy(this.policyForm.value).subscribe(
          
      res => {
        console.log(this.policyForm.value);
        this.getPolicies();
        this.onClosePolicyModal();
        this.notifyService.showSuccess("Policy Added Successfully !!", "😎")
        location.reload();
      },
      err => {
        console.log(err)
      }
    )
  }

  onAddClient() {
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
    location.reload();
  }

  onClosePolicyModal() {
    this.showPolicyModal = false;
  }
  

  onPolicyDeleteSubmit(client, id) {
    console.log(this.policyForm);
    this.policyForm.patchValue({ ClientName: this.currentClientData })
    this.currentClientPolicyData = id;
    client.policies.splice(id, 1);
    console.log(this.clients);
    this.editMode = true;
    this.onClientSubmit();
    this.editMode = false;


  }

  onDeleteClient(id) {
    this.clientService.deleteClient(id).subscribe(
      res => {
        console.log(res);

        this.notifyService.showSuccess("Client deleted successfully !!", "😎")
        location.reload();
        this.getClients();
      },
      err => {
        console.log(err);
      }
    )
  }



  onDeletePolicy(id, currentDeleteClient) {
    console.log(id + "=======================" + currentDeleteClient)
    this.policyService.deletePolicy(id, currentDeleteClient).subscribe(
      res => {
        console.log(res);

        this.notifyService.showSuccess("Policy deleted successfully !!", "😎")
        location.reload();
        this.getClients();
      },
      err => {
        console.log(err);
      }
    )
  }



  assignDeleteId(id, clientName) {
    this.deleteId = id;
    this.currentDeleteClient = clientName;
    console.log(this.deleteId);
  }

  currentClient(id) {
    this.currentClientData = id;
  }

  currentPolicyData(policy, id) {
    console.log('hi')
    this.showViewPolicy = true;
    console.log(this.showViewPolicy)
    this.currentPolicy = id;

  }

}
