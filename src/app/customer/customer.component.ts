import { Component, ViewChild } from '@angular/core';
import { Customer } from '../model/customer';
import { CustomerService } from '../service/customer.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {


  displayedColumns: string[] = ['idCustomer', 'firstNameCustomer', 'lastNameCustomer', 'cpfCustomer', 'birthdateCustomer', 'dateCreatedCustomer', 'monthlyIncomeCustomer', 'emailCustomer', 'statusCustomer', 'deleteCustomer', 'findCustomer'];
  ELEMENT_DATA: Customer[] = [];
  message: string = '';
  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);
  success: boolean = false;
  errors!: String[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: CustomerService){   
  }

  ngOnInit(): void {   
    this.listCustomer(); 
  }

  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: '',
    lastNameCustomer: '',
    birthdateCustomer: '',
    dateCreatedCustomer: '',
    monthlyIncomeCustomer: '',
    cpfCustomer: '',
    emailCustomer: '',
    passwordCustomer: '',
    statusCustomer: true
  }

  saveCustomer() {    
    const datePipe = new DatePipe('en-US');
    this.customer.birthdateCustomer = datePipe.transform(this.customer.birthdateCustomer, 'dd/MM/yyyy');
    
    this.service.save(this.customer).subscribe((response: any) => {
      this.success = true;
      this.errors = [];
      this.customer = response.result as Customer;       
      var date = this.customer.birthdateCustomer;
      var newDate = date.split("/").reverse().join("-");
      this.customer.birthdateCustomer = newDate; 
      this.listCustomer();   
    });
  }

  listCustomer() {
    this.service.list().subscribe((response: any) => {
      this.ELEMENT_DATA = response.result as Customer[];
      this.dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCustomer(customer: Customer) {
    if (window.confirm('Deseja realmente excluir este cliente?')) {
      this.service.delete(customer.idCustomer).subscribe((response: any) => {
        this.message = response.result.result as string;
        window.alert(this.message);
        this.listCustomer();
      });
    }
  }

  findCustomer(customer: Customer) {    
    this.service.findById(customer.idCustomer).subscribe((response: any) => {
      this.customer = response.result as Customer; 
      const datePipe = new DatePipe('en-US');
      var date = this.customer.birthdateCustomer;
      var newDate = date.split("/").reverse().join("-");
      this.customer.birthdateCustomer = newDate;
    });
  }

}