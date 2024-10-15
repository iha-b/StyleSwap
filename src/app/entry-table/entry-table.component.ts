import {Component, Inject, OnInit, Input} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {UserEntriesService} from "../Services/user-entries.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.scss']
})
export class EntryTableComponent implements OnInit {

  @Input() events: Observable<void>;

  dataSource!:any;
  displayedColumns = ["name", "category", "preview", "delete"];
  private eventsSubscription: Subscription;
  constructor( private entryService:UserEntriesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("hello");
    this.test();
    this.eventsSubscription = this.entryService.eventsSubject.subscribe(() => this.test());
    console.log(this.dataSource);

  }
  ngOnDestroy() {
    //this.eventsSubscription.unsubscribe();
  }

  async test() {
    let result = await this.requestDataAndWait();
    this.dataSource = result;

  }

  deleteEnt(ent) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: {ent: ent},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.test();
    });
  }


  async requestDataAndWait() {
    return await this.entryService.getEntries();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./diag.css']
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private entryService:UserEntriesService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onDelete(ent) {
    this.entryService.deleteEntry(ent);
    this.dialogRef.close();
  }
}
