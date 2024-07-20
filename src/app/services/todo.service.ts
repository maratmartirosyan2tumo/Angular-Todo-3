import { Injectable } from '@angular/core';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = [
    new Todo( '1', 'Go to Gym', false),
    new Todo( '2', 'Go to Gym', false),
    new Todo( '3', 'Go to Gym', false),
  ];

  getAll(){
    return [...this.todos]
  }

  create(todo: Todo): Todo {
    const uniqueId = new Date().getTime().toString();
    const updatedTodo: Todo = {...todo, id: uniqueId};
    this.todos.push(updatedTodo);
    return updatedTodo;
  }

  delete(id: string): string {
    const index = this.todos.findIndex(value => value.id === id);
    const toDelete = this.todos[index]
    this.todos.splice(index, 1);
    return toDelete.id;
  }

  update(todo: Todo)  {
  }
}
