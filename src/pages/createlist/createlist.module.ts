import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatelistPage } from './createlist';

@NgModule({
  declarations: [
    CreatelistPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatelistPage),
  ],
})
export class CreatelistPageModule {}
