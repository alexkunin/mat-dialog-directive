import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent {
  title = 'showcase';

  onClick(data: any, ref: MatDialogRef<any>): void {
    console.log({ data, ref });
    ref.close();
  }
}
