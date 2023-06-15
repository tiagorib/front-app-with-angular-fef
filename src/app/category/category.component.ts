import { Component, ViewChild } from '@angular/core';
import { category } from '../model/category';
import { categoryService } from '../service/category.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class categoryComponent {


  displayedColumns: string[] = ['idcategory', 'namecategory', 'descriptionCategory',  'deletecategory', 'findcategory'];
  ELEMENT_DATA: category[] = [];
  message: string = '';
  dataSource = new MatTableDataSource<category>(this.ELEMENT_DATA);
  success: boolean = false;
  errors!: String[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: categoryService){   
  }

  ngOnInit(): void {   
    this.listcategory(); 
  }

  category: category = {
    idcategory: '',
    namecategory: '',
    descriptionCategory: '',
    
  }

  savecategory() {    
  
    this.service.save(this.category).subscribe((response: any) => {
      this.success = true;
      this.errors = [];
      this.category = response.result as category;       
      this.listcategory();   
    });
  }

  listcategory() {
    this.service.list().subscribe((response: any) => {
      this.ELEMENT_DATA = response.result as category[];
      this.dataSource = new MatTableDataSource<category>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  deletecategory(category: category) {
    if (window.confirm('Deseja realmente excluir este cliente?')) {
      this.service.delete(category.idcategory).subscribe((response: any) => {
        this.message = response.result.result as string;
        window.alert(this.message);
        this.listcategory();
      });
    }
  }

  findcategory(category: category) {    
    this.service.findById(category.idcategory).subscribe((response: any) => {
      this.category = response.result as category; 
      
    });
  }

}