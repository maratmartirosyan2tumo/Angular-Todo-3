import { Injectable } from '@angular/core';
import {Todo} from "../models/todo";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = [
    new Todo('1', 'Go to Gym', false),
    new Todo('2', 'Go to Gym', false),
    new Todo('3', 'Go to Gym', false),
  ];

  getAll(){
    return this.todos;
  }
}
