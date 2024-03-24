import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NgbdCarouselNavigation } from './carousel/carousel-navigation';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material.module';

import { StudioAreaComponent } from './studio-area/studio-area.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { MultipleEntryComponent } from './multiple-entry/multiple-entry.component';
import { DialogOverviewExampleDialog } from './multiple-entry/multiple-entry.component';

const appRoutes: Routes = [
  { path: 'coming-soon', component: DataEntryComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <-- debugging purposes only
  ), 
  BrowserModule, 
  FormsModule, 
  ReactiveFormsModule, 
  HttpClientModule, 
  MatDialogModule,
  BrowserAnimationsModule,
  DemoMaterialModule,
  NgbModule],
  declarations: [AppComponent, 
    NgbdCarouselNavigation, 
    StudioAreaComponent, 
    DataEntryComponent,
    MultipleEntryComponent,
    DialogOverviewExampleDialog],
  entryComponents: [MultipleEntryComponent, DialogOverviewExampleDialog],
  bootstrap: [AppComponent]
})

export class AppModule {}
