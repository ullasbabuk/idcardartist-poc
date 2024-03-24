import { Component, AfterViewInit, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  modalStudentName: string;
  modalStudentClass: string;
  modalAdmissionNumber: string;
  modalDateOfBirth: string;
  modalStudentContactNumber: string;
  modalStudentBloodGroup: string;
  profileUrl;
  backgroundUrl;
  download;
}

@Component({
  selector: 'multiple-entry',
  templateUrl: './multiple-entry.component.html',
  styleUrls: ['./multiple-entry.component.css']
})

export class MultipleEntryComponent implements AfterViewInit {

  @ViewChild('myCanvas') finalCanvas: any;  
  @Output() clickEventEmitter = new EventEmitter<String>();

  public modalContext: CanvasRenderingContext2D;

  title = 'ADSGROUPS18';
  loading = true;
  backGroundUrl:any;
  profileUrl:any;
  image : any;
  backgroundImage: any;
  profileImage: any;
  backgroundImageUploaded = false;
  studentsDataUploaded = false;
  cells;
  studentList = new Array<any>();
  profileImageFileList;
  modalPrinted = false;

  //-----> STUDENT DATA
  studentName = '';
  admissionNumber = '';
  studentClass = '';
  dateOfBirth = '';
  studentContactNumber = '';
  studentBloodGroup = '';

  constructor(public dialog: MatDialog) {
    console.log("multiple-entry component constructor");
    this.loading = true; 
    this.backgroundImageUploaded = false;
    this.studentsDataUploaded = false;
    
  }

  ngAfterViewInit() {
    console.log("multiple-entry component ngAfterViewInit");
    this.loading = false;   
  }

  backClicked(){
    console.log("-----> backClicked!")
    this.clickEventEmitter.emit("Clicked");
  }

  openModal(student, downloadFlag) {
    console.log("openModal");

      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        //width: '700px',
        //height:'800px',
        data: {
          modalStudentName: student.name,
          modalStudentClass: student.class,
          modalAdmissionNumber: student.admissionNumber,
          modalDateOfBirth: student.dob,
          modalStudentContactNumber: student.contact,
          modalStudentBloodGroup: student.bloodGroup,
          profileUrl: student.profileURL,
          backgroundUrl: this.backGroundUrl,
          download: downloadFlag
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog Closed');
        console.log("RESULT: "+result);
        if (result == 'DONE') {
          this.modalPrinted = true;
        }
      });

  }

  uploadBackgroundImage(event) {

    this.backgroundImageUploaded=true;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.backGroundUrl = (<FileReader>event.target).result;
      }      
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  uploadStudentsData(event) {

    this.studentsDataUploaded=true;

    if (event.target.files && event.target.files[0]) {
      
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        this.cells = reader.result.toString().split(",");
        var itemCount = 0;
        var rowCount = 0;

        for (let entry of this.cells) {
          if (itemCount < 15) {
            ++itemCount;
          } else {
            var student: any = {};
            student.name = this.cells[(rowCount*15)+1];
            if (student.name === '####') {student.name ='';}
            student.photo = this.cells[(rowCount*15)+2];
            if (student.photo === '####') {student.photo ='';}
            student.class = this.cells[(rowCount*15)+3]+"-"+this.cells[(rowCount*15)+4];
            if (student.class === '####') {student.class ='';}
            student.contact = this.cells[(rowCount*15)+11];
            if (student.contact === '####') {student.contact ='';}
            student.dob = this.cells[(rowCount*15)+12];
            if (student.dob === '####') {student.dob ='';}
            student.admissionNumber = this.cells[(rowCount*15)+13];
            if (student.admissionNumber === '####') {student.admissionNumber ='';}
            student.bloodGroup = this.cells[(rowCount*15)+14];
            if (student.bloodGroup.trim() == '####') {student.bloodGroup ='';}

            //-----> Skip header (row:0)
            if (rowCount!=0) {this.studentList.push(student);}

            ++rowCount;  
            itemCount=0;
          }
        }

        //-----> Copy the last one
        if (itemCount = 15) {
          var student: any = {};
          student.name = this.cells[(rowCount*15)+1];
          if (student.name === '####') {student.name ='';}
          student.photo = this.cells[(rowCount*15)+2];
          if (student.photo === '####') {student.photo ='';}
          student.class = this.cells[(rowCount*15)+3]+"-"+this.cells[(rowCount*15)+4];
          if (student.class === '####') {student.class ='';}
          student.contact = this.cells[(rowCount*15)+11];
          if (student.contact === '####') {student.contact ='';}
          student.dob = this.cells[(rowCount*15)+12];
          if (student.dob === '####') {student.dob ='';}
          student.admissionNumber = this.cells[(rowCount*15)+13];
          if (student.admissionNumber === '####') {student.admissionNumber ='';}
          student.bloodGroup = this.cells[(rowCount*15)+14];
          if (student.bloodGroup.trim() == '####') {student.bloodGroup ='';}

          this.studentList.push(student);
        }

      }

      reader.readAsText(file);

    }

  }

  uploadStudentsImages(event) {

    if (event.target.files && event.target.files[0]) {
      this.profileImageFileList = event.target.files;

      for (let student of this.studentList) {
        for (let profileFile of this.profileImageFileList) {
          if (profileFile.name.includes(student.photo)) {
            console.log("student.photo: "+student.photo);
            console.log("profileFile.name: "+profileFile.name);
            student.imageFileName = profileFile.name;
            var reader = new FileReader();
            reader.onload = (event: ProgressEvent) => {
              student.profileURL = (<FileReader>event.target).result;
            }
            reader.readAsDataURL(profileFile);
          }
        }
      }

    }
  }

  downloadAll() {
  
    console.log("DOWNLOAD ALL");
    
    this.studentList.forEach((student, index) => {
      setTimeout(() => {
        console.log("PRINTING: "+student.name);
        this.openModal(student, true);
      }, 1000+(1500*index));
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'id-preview-modal.html',
})
export class DialogOverviewExampleDialog {

  context;
  @ViewChild('myCanvas') finalCanvas: any;

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close('DONE');
  }

  downloadSingle(): void {

    var downLoadimage = new Image();
    downLoadimage.src = (<HTMLCanvasElement>this.finalCanvas.nativeElement).toDataURL("image/png");

    var link = document.createElement("a");
    link.setAttribute("href", downLoadimage.src);
    link.setAttribute("download", this.data.modalStudentName.trim()+"-"+this.data.modalAdmissionNumber.trim()+".png");
    link.click();

    if (this.data.download) {this.dialogRef.close('DONE');}

  }

  ngAfterViewInit() {

    console.log("DialogOverviewExampleDialog ngAfterViewInit");

    //this.dialogRef.updateSize('50%', '80%');

    this.context = (<HTMLCanvasElement>this.finalCanvas.nativeElement).getContext('2d');

    var backgroundImage = new Image();
    var localContext1 = this.context;
    backgroundImage.onload = function() {
      localContext1.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height);
    }
    backgroundImage.src = this.data.backgroundUrl;

    setTimeout(() => {
      var profileImage = new Image();
      profileImage.onload = function() {
        profileImage.width = 290;
        profileImage.height = 390;
        localContext1.drawImage(profileImage, 155, 222, profileImage.width, profileImage.height);  
      }
      profileImage.src = this.data.profileUrl;  
    },500);

    setTimeout(() => {
      this.context.fillStyle = '#3B3B40';
      this.context.font = "bolder 37px Arial";
      var startPointX = 310 - (this.data.modalStudentName.length/2)*25;
      this.context.fillText(this.data.modalStudentName, startPointX, 675);
    
      this.context.font = "bolder 25px Georgia";
      this.context.fillText("Std : "+this.data.modalStudentClass, 100, 720);
      this.context.fillText("Admn No : "+this.data.modalAdmissionNumber, 280, 720);
      this.context.fillText("DOB : "+this.data.modalDateOfBirth, 182, 760);
      this.context.font = "bolder 30px Georgia";
      startPointX = 310 - (this.data.modalStudentContactNumber.length/2)*22;
      this.context.fillText(this.data.modalStudentContactNumber, startPointX, 800);
    
      this.context.fillStyle = 'white';
      if (this.data.modalStudentBloodGroup.length >=3) {
        this.context.font = "bolder 25px Arial";
        this.context.fillText(this.data.modalStudentBloodGroup, 480, 605);
      } else {
        this.context.font = "bolder 30px Arial";
        this.context.fillText(this.data.modalStudentBloodGroup, 482, 605);
      } 
      if (this.data.download) {
        this.downloadSingle();
      }               
    }, 700);
  }
  
}