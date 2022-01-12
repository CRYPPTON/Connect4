import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Connect4Component } from './components/connect4/connect4.component';

const routes: Routes = [
  {
    path: '', component: Connect4Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
