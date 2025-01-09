import {ChangeDetectionStrategy, Component, Inject, inject, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

/**
 * @title Dialog elements
 */
@Component({
  selector: 'dialog-elements-example',
  template: `<button mat-raised-button color="warn" style="width: 100%;" > <ng-content></ng-content> </button>`,
  imports: [MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsExample {
  readonly dialog = inject(MatDialog);
}

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    console.log(this.data.clearList);
    this.data.clearList();
    this.dialogRef.close();
  }
}
