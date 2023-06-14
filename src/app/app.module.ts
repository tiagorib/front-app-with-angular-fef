import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './service/customer.service';
import { DatePipe } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { CategoryService } from './service/category.service';
import { ProductService } from './service/product.service';
import { HomeComponent } from './home/home.component';
import { MenubarComponent } from './menubar/menubar.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CategoryComponent,
    ProductComponent,
    HomeComponent,
    MenubarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    CustomerService,
    CategoryService,
    ProductService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
