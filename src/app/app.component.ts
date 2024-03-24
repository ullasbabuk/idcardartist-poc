import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'ADSGROUPS18';
  loading = true;

  constructor() {
    this.loading = true;
  }

  showEvent(agreed: String) {
      this.loading = !this.loading;
  }
  
}
