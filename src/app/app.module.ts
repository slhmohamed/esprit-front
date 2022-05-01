import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/general/home/home.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { AddInvitationComponent } from './add-invitation/add-invitation.component';
import { InvitationService } from './service/invitation.service';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    AddInvitationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    HeaderModule,
    FooterModule,
    FormsModule,
  ],
  providers: [InvitationService],
  bootstrap: [AppComponent],
  exports:[
    AddInvitationComponent
  ]
})
export class AppModule { }
