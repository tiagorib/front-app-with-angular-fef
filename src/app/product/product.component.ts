import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/category';
import { Product } from '../model/product';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  
  displayedColumns: string[] = ['idProduct', 'nameProduct', 'descriptionProduct', 'skuProduct', 'eanProduct', 'costPriceProduct', 'amountProduct','publishedProduct', 'dateCreatedProduct', 'deleteProduct', 'findProduct'];
  ELEMENT_DATA: Product[] = [];
  message: string = '';
  dataSource = new MatTableDataSource<Product>(this.ELEMENT_DATA);
  success: boolean = false;
  errors!: String[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categorias: Category[] = []

  constructor(
      private service: ProductService,
      private categoryService : CategoryService){   
  }

  ngOnInit(): void {   
    this.listProduct(); 
    this.listCategorias();
  }

 
  product: Product = {
    idProduct: '',
    nameProduct: '',
    descriptionProduct: '',
    skuProduct: '',
    eanProduct : '',
    costPriceProduct : '',
    amountProduct : '',
    publishedProduct: true,
    dateCreatedProduct: '',
    idCategory: '',
    nomeCategoria: ''
  }

  saveProduct() {    
    const datePipe = new DatePipe('en-US');
    this.product.dateCreatedProduct = datePipe.transform(this.product.dateCreatedProduct, 'dd/MM/yyyy');   
    this.service.save(this.product).subscribe((response: any) => {
      this.success = true;
      this.errors = [];
      this.product = response.result as Product;       
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
      this.product.idCategory = response.result.category.idCategory;
      this.product.nomeCategoria = response.result.category.nameCategory;
    });
  }

  listCategorias() {

    this.categoryService.list().subscribe((response : any) => {
      this.categorias = response.result;
    })
  }

}
