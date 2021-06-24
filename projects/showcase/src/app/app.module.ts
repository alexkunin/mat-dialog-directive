import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DirectiveModule } from 'dist/directive';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    DirectiveModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
