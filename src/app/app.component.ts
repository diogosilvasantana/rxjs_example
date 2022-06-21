import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  tap,
  debounceTime,
  filter,
  distinctUntilChanged,
  switchMap,
  merge,
} from 'rxjs';
import { AppInterface } from './app.interface';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  filtrarNomeInput = new FormControl();

  todosNomes$ = this.appService
    .getNomes()
    .pipe(tap(() => console.log('Fluxo Incial')));

  filtroNomes$ = this.filtrarNomeInput.valueChanges.pipe(
    debounceTime(300),
    tap(() => console.log('Fluxo de Filtro')),
    filter(
      (valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length
    ),
    tap(console.log),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.appService.getNomes(valorDigitado))
  );

  nomes$ = merge(this.todosNomes$, this.filtroNomes$);

  constructor(public appService: AppService, public dialog: MatDialog) {}
}
