import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorialComponent } from './tutorial.component';
import {AddInvitationComponent} from "../../../add-invitation/add-invitation.component";

const routes: Routes = [
  {
    path: '',
    component: TutorialComponent,
  },
  {path:"addinvitation", component: AddInvitationComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorialRoutingModule { }
