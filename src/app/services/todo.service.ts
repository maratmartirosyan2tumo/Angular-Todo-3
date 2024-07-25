import {Injectable} from '@angular/core';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];

  getAll(): Todo[] {
    this.todos = JSON.parse(localStorage.getItem('todo-items') || '[]') as Todo[]
    return [...this.todos];
  }

  create(todo: Todo): Todo {
    const uniqueId = new Date().getTime().toString();
    const updatedTodo: Todo = {...todo, id: uniqueId};
    this.todos.unshift(updatedTodo);
    this.setAll(this.todos);
    return updatedTodo;
  }

  delete(id: string): string {
    const index = this.todos.findIndex(value => value.id === id);
    const toDelete = this.todos[index];
    this.todos.splice(index, 1);
    this.setAll(this.todos);
    return toDelete.id;
  }

  update(todo: Todo): Todo {
    const index = this.todos.findIndex(value => value.id === todo.id);
    this.todos[index] = {...todo};
    this.setAll(this.todos);
    return this.todos[index];
  }

  private setAll(todos: Todo[]): void {
    localStorage.setItem('todo-items', JSON.stringify(todos));
  }
}
