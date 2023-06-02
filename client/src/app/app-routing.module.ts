import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HelpComponent } from './components/help/help.component';

const routes: Routes = [
  { path: 'upload', loadChildren: () => import('./modules/upload/upload.module').then(m => m.UploadModule) }, { path: 'shared', loadChildren: () => import('./modules/shared/shared.module').then(m => m.SharedModule) },
  { path: '', component: HomeComponent},
  { path: 'help', component: HelpComponent},
  { path: 'upload', loadChildren: () => import('./modules/upload/upload.module').then(m => m.UploadModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
