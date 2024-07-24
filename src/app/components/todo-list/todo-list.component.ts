import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {
  }

  ngOnInit() { // works after constructor
    this.fetchTodos()
  }

  onAdd(value: string){
    const todo = new Todo('-1', value, false);
    const newTodo = this.todoService.create(todo);
    this.todos.push(newTodo);
  }

  onDelete(id: string) {
    if(confirm('Are you sure?')){
      const deletedId = this.todoService.delete(id);
      if (deletedId) {
        const index = this.todos.findIndex(value => value.id === deletedId);
        this.todos.splice(index, 1);
      }
    }
  }

  fetchTodos(){
    this.todos = this.todoService.getAll()
  }

  onEdit(todo: Todo) {
    todo.isEditing = true;
  }

  onSave(todo: Todo, newTitle: string) {
    todo.isEditing = false;
    todo.title = newTitle;
    const updatedTodo = this.todoService.update(todo);
    if(updatedTodo){
      const index = this.todos.findIndex(value => value.id === updatedTodo.id);
      this.todos[index] = {...updatedTodo};
    }
  }

  onCancel(todo: Todo) {
    todo.isEditing = false;
    const index = this.todos.findIndex(value => value.id === todo.id);
    this.todos[index] = {...this.todos[index]}
  }
}
