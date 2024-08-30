import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Organization } from '../models/organization.model';
import { Policy } from '../models/policy.model';
import { EmployeeService } from '../services/employee.service';
import { OrganizationService } from '../services/organization.service';
import { PolicyService } from '../services/policy.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NotificationService } from '../services/notification.service';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  orgForm: FormGroup;
  empForm: FormGroup;
  showModal: boolean = false;
  orgModal: boolean = false;
  empModal: boolean = false;
  editMode: boolean = false;
  organizations: Organization[];
  employees: Employee[];
  showupdate: boolean;
  showadd: boolean;
  policies: Array<any> = [];
  orgObj: Organization = new Organization();
  deleteId = '';
  currentDeleteOrg = '';
  currentOrgData = '';
  empObj: Employee = new Employee();
  clients: Client[];
  clients1: Client[];
  editEmpData =[];

  //multiselect dropdown start

  dropdownList: Client[];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  //multiselect dropdown end

  
  constructor(
    private fb: FormBuilder,
    private orgService: OrganizationService,
    private router: Router,
    private empService: EmployeeService,
    private policyService: PolicyService,
    private clientService: ClientService,
    private notifyService: NotificationService,

  ) {

    this.orgForm = this.fb.group({
      _id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      clients:[''],
      client1: [''],
      client2: [''],
      client3: [''],
      client4: [''],
      addDynamicElement: this.fb.array([]),

    });

    

  }

  ngOnInit(): void {
    this.getClients();
    this.getOrganization();
    this.getEmployees();

    

    //multiselect dropdown start

    // this.policies = Policy[];

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'PolicyName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };



    //multiselect dropdown end

    this.empForm = this.fb.group({
      id: [''],
      empName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      empSalary: ['', [Validators.required, Validators.pattern("^[0-9]{3,6}$")]],
      empMobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      empMail: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      empAge: [''],
      empAdhar: [''],
      empAddress: [''],
      empCompany: ['']

    })




  }

  get Policies() {
    return this.policies.reduce((acc, curr) => {
      acc[curr._id] = curr;
      return acc;
    }, {});
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  onCloseModal() {
    this.showModal = false;
    location.reload();
  }

  onCloseOrgModal() {
    this.orgModal = false;
  }

  onCloseEmpModal() {
    this.empModal = false;
    this.orgModal = true;
  }

  getOrganization() {
    this.orgService.getOrganizationList().subscribe((res: Organization[]) => {
      console.log(res);
      this.organizations = res;
    })
  }

  getPolicies() {
    this.policyService.getPolicyList().subscribe((res: Policy[]) => {
      console.log(res);
      this.policies = res;
    })
  }

  getClients() {
    this.clientService.getClientList().subscribe((res: Client[]) => {
      console.log(res);
      this.clients = res;
    })
  }

  onEditOrganization(org: any) {
    this.orgObj.id = org._id;
    this.orgForm.patchValue(org);

  }




  get addDynamicElement() {
    return this.orgForm.get('addDynamicElement') as FormArray
  }

  addPolicies() {
    this.addDynamicElement.push(this.fb.control(''))
  }

  assignDeleteId(id, orgName) {
    this.deleteId = id;
    this.currentDeleteOrg = orgName;
    console.log(this.deleteId);
  }

  onOrganizationSubmit() {
    this.orgService.addOrganization(this.orgForm.value).subscribe(
      res => {
        this.getOrganization();
        this.notifyService.showSuccess("Client Added Successfully", "😎");
        console.log(res);
        console.log(this.orgForm.value)
        location.reload();
      },
      err => {
        console.log(err)
      }
    )
  }

  onOrgUpdate() {
    this.orgObj.name = this.orgForm.value.name;
    this.orgObj.location = this.orgForm.value.location;
    this.orgObj.client1 = this.orgForm.value.client1;
    this.orgObj.client2 = this.orgForm.value.client2;
    this.orgObj.client3 = this.orgForm.value.client3;
    this.orgObj.client4 = this.orgForm.value.client4;
    this.orgService.updateOrganization(this.orgObj.id, this.orgObj).subscribe(
      res => {
        this.notifyService.showSuccess("Client Updated Successfully", "😎")
        console.log('In update service')
        this.getOrganization();
        location.reload();
      },
      err => {
        console.log(err)
      }
    )
  }

  onDeleteOrganization(id) {
    this.orgService.deleteOrganization(id).subscribe(
      res => {
        console.log(res);

        this.notifyService.showSuccess("Organization deleted successfully", "😎")
        location.reload();
        this.getOrganization();
      },
      err => {
        console.log(err);
      }
    )
  }

  currentOrg(id) {
    this.currentOrgData = id;
    this.empForm.patchValue({ empCompany: this.currentOrgData })
  }

  getEmployees() {
    this.empService.getEmployeeList().subscribe((res: Employee[]) => {
      console.log(res);
      this.employees = res;
    })
  }



  onEditEmployee(emp: any) {
    this.currentOrgData = emp.empCompany;
    console.log(emp)
    
    this.empObj.id = emp._id;
    this.editMode = true;
    this.showModal = true;
    this.empForm.patchValue(emp);
    
    
    this.editEmpData = this.empForm.value;
    console.log(this.editEmpData);
    console.log(this.empForm.value);
    console.log(this.currentOrgData)
  }

  onEmpSubmit() {
    console.log(this.empForm.value);
    // this.empForm.setValue({ empCompany: this.currentOrgData })
   this.empForm.patchValue({ empCompany: this.currentOrgData })
    // this.currentClientPolicyData = id;
    console.log(this.currentOrgData)
    this.empService.addEmployee(this.empForm.value).subscribe(

      res => {
        console.log(this.empForm.value);
        this.getEmployees();
        this.notifyService.showSuccess("Employee Added Successfully", "😎")
        location.reload();
      },
      err => {
        console.log(err)
      }
    )
  }

  onEmployeeUpdate() {
    // console.log('In update service')
    this.empObj.empName = this.empForm.value.empName;
    this.empObj.empSalary = this.empForm.value.empSalary;
    this.empObj.empMobile = this.empForm.value.empMobile;
    this.empObj.empMail = this.empForm.value.empMail;
    this.empObj.empAge = this.empForm.value.empAge;
    this.empObj.empAdhar = this.empForm.value.empAdhar;
    this.empObj.empAddress = this.empForm.value.empAddress;
    this.empObj.empCompany = this.empForm.value.empCompany;

    this.empService.updateEmployee(this.empObj.id, this.empObj).subscribe(
      res => {
        this.notifyService.showSuccess("Employee Updated Successfully", "😎")
        console.log('In update service')
        console.log(this.empObj)

        location.reload();
      },
      err => {
        console.log(err)
      }
    )

  }

  onAddEmployee() {
    this.showModal = true;
  }

  onDeleteEmp(id, currentDeleteOrg) {
    console.log(id + "=======================" + currentDeleteOrg)
    this.empService.deleteEmployee(id, currentDeleteOrg).subscribe(
      res => {
        console.log(res);

        this.notifyService.showSuccess("Employee deleted successfully", "😎")
        location.reload();
        this.getEmployees();
      },
      err => {
        console.log(err);
      }
    )
  }

  // firstDropDownChange(event) {
  //   this.clients1 = this.clients.filter((data) => parseInt(event.target.value) <= data
  //   );
  //   console.log(this.clients1);
  //   this.orgForm.controls['secondDropdown'].setValue(parseInt(this.clients1[0]));
  // }

  // secondDropDownChange(event) {}
  

  onChange(){
    console.log(this.clients)
  }

}
  


