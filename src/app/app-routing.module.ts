import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  },
  {
    path: 'page1',
    loadChildren: './modules/page1/page1.module#Page1Module',
  }, {
    path: 'page2',
    loadChildren: './modules/page2/page2.module#Page2Module'
  }, {
    path: 'main',
    loadChildren: './modules/main/main.module#MainModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
