import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-carousel-navigation',
  templateUrl: './carousel-navigation.html',
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class NgbdCarouselNavigation {

  @Output() clickEventEmitter = new EventEmitter<String>();

  loading = true;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor(config: NgbCarouselConfig, private _http: HttpClient) {
    // customize default values of carousels used by this component tree
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
      config.interval = 8000;
  }

  onVoted(agreed: String) {
    console.log("2: "+agreed);
  }

  onClickMe() {
    console.log("-----> onClicked!")

    this.loading = false;
    this.clickEventEmitter.emit("Clicked");

  }

}