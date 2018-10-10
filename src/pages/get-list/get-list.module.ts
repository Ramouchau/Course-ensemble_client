import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetListPage } from './get-list';

@NgModule({
  declarations: [
    GetListPage,
  ],
  imports: [
    IonicPageModule.forChild(GetListPage),
  ],
})
export class GetListPageModule {}
