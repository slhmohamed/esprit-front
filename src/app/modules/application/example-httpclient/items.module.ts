import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsComponent } from './items.component';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsService } from './items.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import {ListnewsComponent} from "../../../listeinvitation/listnews.component";

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,

    DataTablesModule,

  ],
  exports: [
    ItemsComponent
  ],
  declarations: [
    ItemsComponent,
    ListnewsComponent,
  ],
  providers: [ItemsService],
})
export class ItemsModule { }
