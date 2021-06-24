import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectiveComponent } from './directive.component';
import { MatDialogDirective } from './mat-dialog.directive';

@NgModule({
  declarations: [
    DirectiveComponent,
    MatDialogDirective,
  ],
  imports: [
    MatDialogModule,
  ],
  exports: [
    DirectiveComponent,
    MatDialogDirective,
  ],
})
export class DirectiveModule {
}
