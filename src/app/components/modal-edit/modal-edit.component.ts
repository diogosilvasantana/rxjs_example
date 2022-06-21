import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppInterface } from 'src/app/app.interface';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit {
  formValue!: FormGroup;

  editValue!: AppInterface;
  constructor(
    public dialogRef: MatDialogRef<ModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppInterface
  ) {
    this.editValue = this.data;
  }

  ngOnInit() {
    this.formValue = new FormGroup({
      id: new FormControl(this.data.id || ''),
      nome: new FormControl(this.data.nome || ''),
      nascimento: new FormControl(this.data.nascimento || ''),
    });
  }

  onSave() {
    this.dialogRef.close(this.formValue.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
