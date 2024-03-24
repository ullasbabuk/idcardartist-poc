import { Component, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'single-entry',
  templateUrl: './data-entry.component.html'
})

export class DataEntryComponent implements AfterViewInit {

  @ViewChild('myCanvas') finalCanvas: any;  
  @Output() clickEventEmitter = new EventEmitter<String>();

  public context: CanvasRenderingContext2D;

  title = 'ADSGROUPS18';
  loading = true;
  url:any;
  profileUrl:any;
  image : any;
  backgroundImage: any;
  profileImage: any;

  studentFormControl = new FormControl('');

  //-----> STUDENT DATA
  studentName = '';
  admissionNumber = '';
  studentClass = '';
  dateOfBirth = '';
  studentContactNumber = '';
  studentBloodGroup = '';

  constructor() {
    this.loading = true;
    console.log("data-entry component constructor");
  }

  ngAfterViewInit() {
    console.log("data-entry component ngAfterViewInit");
    this.loading = false; 
    //this.finalImage = document.getElementById('finalImage');
    this.context = (<HTMLCanvasElement>this.finalCanvas.nativeElement).getContext('2d');
  }

  backClicked(){
    console.log("-----> backClicked!")
    this.clickEventEmitter.emit("Clicked");
  }

  processFile(event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;        
        var newImage = new Image();
        var localContext = this.context;
        newImage.onload = function() {
          localContext.drawImage(newImage, 0, 0, newImage.width, newImage.height);
        }
        newImage.src = this.url;
      }      
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  processProfileImage(event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.profileUrl = (<FileReader>event.target).result;
        var profileImage = new Image();
        var localContext = this.context;
        profileImage.onload = function() {
          profileImage.width = 290;
          profileImage.height = 390;
          localContext.drawImage(profileImage, 155, 222, profileImage.width, profileImage.height);
        }
        profileImage.src = this.profileUrl;
      }      
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  process(event:any) {

    //this.context.drawImage(this.finalImage.nativeElement, 0, 0, this.finalImage.nativeElement.width, this.finalImage.nativeElement.height);
    //this.context.drawImage(this.profileImage.nativeElement, 145, 215, this.profileImage.nativeElement.width, this.profileImage.nativeElement.height);
    
    /*
    var scratchCanvas = document.createElement('canvas');
    scratchCanvas.width = 315;
    scratchCanvas.height = 405;
    var scratchCtx = scratchCanvas.getContext('2d');
    scratchCtx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    scratchCtx.globalCompositeOperation = 'source-over';
    scratchCtx.drawImage(this.profileImage.nativeElement, 0, 0, this.profileImage.nativeElement.width, this.profileImage.nativeElement.height);
    scratchCtx.fillStyle = '#000';
    scratchCtx.globalCompositeOperation = 'destination-in';
    scratchCtx.beginPath();
    scratchCtx.arc(50, 50, 50, 1 * Math.PI, 1.5 * Math.PI, false);
    //scratchCtx.stroke();
    scratchCtx.closePath();
    scratchCtx.fill();    
    this.context.drawImage(scratchCanvas, 145, 215, this.profileImage.nativeElement.width, this.profileImage.nativeElement.height);
    */
    
    this.context.fillStyle = '#3B3B40';
    this.context.font = "bolder 37px Arial";
    var startPointX = 310 - (this.studentName.length/2)*25;
    this.context.fillText(this.studentName, startPointX, 675);

    this.context.font = "bolder 25px Georgia";
    this.context.fillText("Std : "+this.studentClass, 100, 720);
    this.context.fillText("Admn No : "+this.admissionNumber, 280, 720);
    this.context.fillText("DOB : "+this.dateOfBirth, 182, 760);
    this.context.font = "bolder 30px Georgia";
    this.context.fillText(this.studentContactNumber, 205, 800);

    this.context.fillStyle = 'white';
    if (this.studentBloodGroup.length >=3) {
      this.context.font = "bolder 25px Arial";
      this.context.fillText(this.studentBloodGroup, 480, 605);
    } else {
      this.context.font = "bolder 30px Arial";
      this.context.fillText(this.studentBloodGroup, 482, 605);
    }
    
  }

  clearCanvas (event:any) {

    this.context.clearRect(0, 0, 600, 880);

    var newImage1 = new Image();
    var localContext = this.context;
    newImage1.onload = function() {
      localContext.drawImage(newImage1, 0, 0, newImage1.width, newImage1.height);
    }
    newImage1.src = this.url;

    window.location.reload();
  }

  downLoadPDF(event:any) {

    var downLoadimage = new Image();
    downLoadimage.src = (<HTMLCanvasElement>this.finalCanvas.nativeElement).toDataURL("image/png");

    var link = document.createElement("a");
    link.setAttribute("href", downLoadimage.src);
    link.setAttribute("download", this.studentName+"-"+this.admissionNumber+".png");
    link.click();

  }

}
