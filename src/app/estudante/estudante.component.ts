import { EstudanteService } from './../estudante.service';
import { Estudante } from './../estudante';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudanteComponent implements OnInit {
  estudante: Estudante[] = [];
  estudantes: Estudante = {} as Estudante;
  isEditing: boolean = false;

  constructor(
    private estudanteService: EstudanteService
  ) {
  }

  ngOnInit(): void {
    this.loadEstudantes();
  }
  loadEstudantes(){
    this.estudanteService.getEstudantes().subscribe({
      next: (data) => (this.estudante = data),
    });
  }

  onCleanEvent() {
    this.isEditing = false;
  }

  onSaveEvent(estudante: Estudante) {
    if (this.isEditing) {
      this.estudanteService.update(estudante).subscribe({
        next: () => {
          this.loadEstudantes();
          this.isEditing = true;
        }
      });
    }
    else {
      this.estudanteService.save(estudante).subscribe({
        next: data => {
          this.estudante.push(data)
        }
       });
    }
  }

  clean(){
    this.isEditing = false;
  }

  edit(estudante: Estudante) {
    this.estudantes = estudante;
    this.isEditing = true;
  }

  remove(estudante: Estudante) {
    this.estudanteService.delete(estudante).subscribe({
      next: () => this.loadEstudantes(),
    });
  }
}