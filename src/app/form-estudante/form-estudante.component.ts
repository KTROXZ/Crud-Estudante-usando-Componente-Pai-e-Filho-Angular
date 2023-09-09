import { Estudante } from '../estudante';
import { EstudanteService } from '../estudante.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-form-estudante',
  templateUrl: './form-estudante.component.html',
  styleUrls: ['./form-estudante.component.css']
})
export class FormEstudanteComponent implements OnChanges{
  @Input()
  estudante: Estudante = {} as Estudante;

  @Output()
  saveEvent = new EventEmitter<Estudante>();

  @Output()
  cleanEvent = new EventEmitter<void>();

  formGroupEstudante: FormGroup;

  constructor(
    private estudanteService: EstudanteService, private formBuilder: FormBuilder
  ){
    this.formGroupEstudante = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      phone: [''],
      addres: [''],
      course: [''],
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formGroupEstudante.setValue(this.estudante);
  }

  save() {
    if(this.formGroupEstudante.valid){
      this.saveEvent.emit(this.formGroupEstudante.value);
      this.formGroupEstudante.reset();
    }
  }

  clean(){
    this.cleanEvent.emit();
    this.formGroupEstudante.reset();
  }
}
