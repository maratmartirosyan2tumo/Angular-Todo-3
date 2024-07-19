import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component'
import {TodoListComponent} from "./components/todo-list/todo-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HeaderComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Todo-App';

  constructor() {}
}
