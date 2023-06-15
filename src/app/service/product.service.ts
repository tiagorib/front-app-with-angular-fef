import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product } from '../model/product';
import { API_CONFIG } from '../config/api_config';
import { Category } from '../model/category';

@Injectable()
export class ProductService {
    url = API_CONFIG.urlApi
  constructor(private http: HttpClient) {}
  save (product: Product) : Observable<Product[]> {
    return this.http.post<Product[]>(this.url+'/product/insert', product);
  }

  list() : Observable<Product[]>{
  return this.http.get<Product[]>(this.url+'/product/list');
}

  listCategory() : Observable<Category[]>{
  return this.http.get<Category[]>(this.url+'/category/list');
}

  delete(idProduct:any) : Observable<Product[]>{
  return this.http.delete<Product[]>(`${this.url}/product/delete/${idProduct}`);
}

  findById(idProduct: any): Observable<Product> {
  return this.http.get<any>(`${this.url}/product/findProduct/${idProduct}`);
}

  update(product: Product) : Observable<Product>{
    return this.http.put<Product>(this.url+'/product/update', product);
  }

}