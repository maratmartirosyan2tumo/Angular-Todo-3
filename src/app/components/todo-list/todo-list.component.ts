import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgForOf
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

  fetchTodos(){
    this.todos = this.todoService.getAll()
  }
}
