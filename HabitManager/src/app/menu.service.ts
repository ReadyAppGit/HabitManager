import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private EditTask = new Subject<void>();
  public EditTask$ = this.EditTask.asObservable();

 
  constructor() { }

  changeEditOption(editValue){ //desde tab1 tamcio este valir
    this.EditTask.next(editValue); //deste task me suscribo para ver este valor
  }
}
