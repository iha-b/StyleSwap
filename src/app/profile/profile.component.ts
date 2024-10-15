import {Component, ElementRef, Inject, NgModule, OnInit, ViewChild} from '@angular/core';
import {Parse} from 'parse'
import {UserEntriesService} from "../Services/user-entries.service";
import {Subject} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatStepperIntl, MatStepperModule} from "@angular/material/stepper";

var file;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: string;
  fileName!: any;

  constructor(private entryService: UserEntriesService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user = Parse.User.current().getUsername();
    console.log(this.entryService.getEntries());
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddDialog, {
      width: '500px',
      data: "hello"
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.test();
    // });
  }

  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    console.log("this happened")
    this.eventsSubject.next();
  }

  async onFileSelected(event) {

     file  = event.target.files[0];
    console.log(file);
    // if (file) {
    //   await this.entryService.addEntry(file, "testoo", "top");
    //   this.emitEventToChild();
    // }

  }

  async onUp () {
    if (file) {
      await this.entryService.addEntry(file, "testoo", "top");
      this.emitEventToChild();
    }
  }


}

@Component({
  selector: 'add-dialog',
  templateUrl: 'add-dialog.html',
  styleUrls: ['./add-dialog.css']
})
export class AddDialog {
  constructor(
    public dialogRef: MatDialogRef<AddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entryService: UserEntriesService,
    private _formBuilder: FormBuilder
  ) {
  }
  @ViewChild('file_in') file_in: ElementRef<HTMLElement>;

  onUpload() {
    let el: HTMLElement = this.file_in.nativeElement;
    el.click();

  }
  fileName = '';
  isLinear = true;
  firstFormGroup = new FormGroup({
    name: new FormControl()
  });
  secondFormGroup: FormGroup;
  category!: any;
  categories = ["Head Wear", "Tops (upper body clothing)", "Bottoms", "Footwear"];

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      category: ['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      fileCtrl: ['', Validators.required],
    });
  }

  onNext() {
    console.log('Name:' + this.firstFormGroup.get('category').value);
  }

  onNoClick(): void {
    file = null;
    this.dialogRef.close();

  }
  async onFileSelected(event) {

    file  = event.target.files[0];
    console.log(file);
    if (file) {
      this.fileName = file.name;
    }
    // if (file) {
    //   await this.entryService.addEntry(file, "testoo", "top");
    //   this.emitEventToChild();
    // }

  }
  async onSubmit() {

    console.log(file);
    if (file) {
      await this.entryService.addEntry(file, this.firstFormGroup.get('name').value, this.firstFormGroup.get('category').value);
      await this.entryService.eventsSubject.next();
      //this.emitEventToChild();
    }
    //this.entryService.deleteEntry(ent);
    file = null;


    this.dialogRef.close();
  }



}
