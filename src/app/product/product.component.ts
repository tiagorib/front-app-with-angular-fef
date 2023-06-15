import { Component } from '@angular/core';
import { Product } from '../model/product';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ProductService } from '../service/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {


  displayedColumns: string[] = ['idProduct', 'nameProduct', 'descriptionProduct', 'skuProduct', 'eanProduct', 'costPriceProduct', 'amountProduct', 'publishedProduct', 'dateCreatedProduct', 'category', 'deleteProduct', 'findProduct'];
  ELEMENT_DATA: Product[] = [];
  message: string = '';
  dataSource = new MatTableDataSource<Product>(this.ELEMENT_DATA);
  success: boolean = false;
  errors!: String[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ProductService){   
  }

  ngOnInit(): void {   
    this.listProduct(); 
  }

  product: Product = {
    idProduct: '',
    nameProduct: '',
    descriptionProduct: '',
    skuProduct: '',
    eanProduct: '',
    costPriceProduct: '',
    amountProduct: '',
    publishedProduct: false,
    dateCreatedProduct: '',
    category: 2,
  }

  saveProduct() {    
    const datePipe = new DatePipe('en-US');
    this.product.dateCreatedProduct = datePipe.transform(this.product.dateCreatedProduct, 'dd/MM/yyyy');
    
    this.service.save(this.product).subscribe((response: any) => {
      this.success = true;
      this.errors = [];
      this.product = response.result as Product;       
      this.product.category = this.product.category;
      var date = this.product.dateCreatedProduct;
      var newDate = date.split("/").reverse().join("-");
      this.product.dateCreatedProduct = newDate; 
      this.listProduct();   
    });
  }

  listProduct() {
    this.service.list().subscribe((response: any) => {
      this.ELEMENT_DATA = response.result as Product[];
      this.dataSource = new MatTableDataSource<Product>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteProduct(product: Product) {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      this.service.delete(product.idProduct).subscribe((response: any) => {
        this.message = response.result.result as string;
        window.alert(this.message);
        this.listProduct();
      });
    }
  }

  findProduct(product: Product) {    
    this.service.findById(product.idProduct).subscribe((response: any) => {
      this.product = response.result as Product; 
      const datePipe = new DatePipe('en-US');
      var date = this.product.dateCreatedProduct;
      var newDate = date.split("/").reverse().join("-");
      this.product.dateCreatedProduct = newDate;
    });
  }

}
