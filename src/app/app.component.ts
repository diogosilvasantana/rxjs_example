import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppInterface } from './app.interface';
import { AppService } from './app.service';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rxjs_examples';
  displayedColumns: string[] = ['id', 'nome', 'nascimento', 'acoes'];
  dataSource$!: Observable<AppInterface[]>;
  newData: AppInterface = { nome: '', nascimento: '' };

  constructor(public appService: AppService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getItens();
  }

  getItens(): void {
    this.dataSource$ = this.appService.getObservableTable();
  }

  editItem(item: AppInterface) {
    this.dialog
      .open(ModalEditComponent, {
        data: item,
      })
      .afterClosed()
      .subscribe((data) => this.appService.putPromiseTable(data).subscribe());
  }

  newItem() {
    this.dialog
      .open(ModalEditComponent, { data: this.newData })
      .afterClosed()
      .subscribe((data) => this.appService.postPromiseTable(data).subscribe());
  }
}
