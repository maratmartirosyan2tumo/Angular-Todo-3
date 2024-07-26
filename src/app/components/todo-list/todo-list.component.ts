import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo.service";
import {FormsModule} from "@angular/forms";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    FormsModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  todos: Todo[] = [];
  ongoingEditing = false;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() { // works after constructor
    this.fetchTodos()
  }

  onAdd(inputElement: HTMLInputElement){
    const value = inputElement.value;
    if (!value){
      return
    }
    const todo = new Todo('-1', value, false);
    const newTodo = this.todoService.create(todo);
    this.todos.unshift(newTodo);
    inputElement.value = '';
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
    if(this.ongoingEditing){return}
    this.ongoingEditing = true;
    todo.isEditing = true;
  }

  onSave(todo: Todo, newTitle: string) {
    todo.isEditing = false;
    todo.title = newTitle;
    this.updateTodo(todo)
    this.ongoingEditing = false;
  }


  onCancel(todo: Todo) {
    todo.isEditing = false;
    const index = this.todos.findIndex(value => value.id === todo.id);
    this.todos[index] = {...this.todos[index]}
    this.ongoingEditing = false;
  }

  updateTodo(todo: Todo) {
    const updatedTodo = this.todoService.update(todo);
    if(updatedTodo){
      const index = this.todos.findIndex(value => value.id === updatedTodo.id);
      this.todos[index] = {...updatedTodo};
    }
  }

  onDeleteAll(inputElement: HTMLInputElement) {
    this.todos = [];
    this.todoService.deleteAll();
  }
}
