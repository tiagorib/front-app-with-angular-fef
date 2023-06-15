import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api_config';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = API_CONFIG.urlApi;

  constructor(private http: HttpClient) { }

  save(product: Product) : Observable<Product[]> {
    console.log("Objeto: "+product);
    return this.http.post<Product[]>(this.url+'/product/create', product);    
  }

  list() : Observable<Product[]> {
    return this.http.get<Product[]>(this.url+'/product/list');    
  }

  delete(idProduct: any): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/product/delete/${idProduct}`);
  }

  findById(idProduct: any): Observable<Product> {
    return this.http.get<any>(`${this.url}/product/findProduct/${idProduct}`);
  }
}
