import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Todo} from "../../models/todo";

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
  todos = [
    new Todo('1', 'Go to Gym', false),
    new Todo('2', 'Go to Gym', false),
    new Todo('3', 'Go to Gym', false),
  ];

  ngOnInit() {
  }
}
