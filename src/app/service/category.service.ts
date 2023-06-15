import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api_config';
import { category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class categoryService {

  url: string = API_CONFIG.urlApi;

  constructor(private http: HttpClient) { }

  save(category: category) : Observable<category[]> {
    return this.http.post<category[]>(this.url+'/category/insert', category);    
  }

  list() : Observable<category[]> {
    return this.http.get<category[]>(this.url+'/category/list');    
  }

  delete(idcategory: any): Observable<category> {
    return this.http.delete<category>(`${this.url}/category/delete/${idcategory}`);
  }

  findById(idcategory: any): Observable<category> {
    return this.http.get<any>(`${this.url}/category/findcategory/${idcategory}`);
  }

}