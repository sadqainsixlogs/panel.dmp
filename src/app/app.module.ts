import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import { HttpModule, } from '@angular/http';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';
import {ColorPickerComponent} from './color-picker/color-picker.component';
import swal from 'sweetalert';
import { FormsModule } from '@angular/forms';
import { ClothesService } from './clothes.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
@NgModule({
  declarations: [
    AppComponent,
    ColorPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule, 
    [ Ng4LoadingSpinnerModule.forRoot() ]
  ],
  providers: [ClothesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
