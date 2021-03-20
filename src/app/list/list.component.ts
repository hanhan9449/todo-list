import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  todoList$;

  constructor(public todoService: TodoService) {
    this.todoList$ = todoService.filteredList$;
  }

  ngOnInit(): void {}
}
