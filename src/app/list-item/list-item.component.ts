import { Component, Input, OnInit } from '@angular/core';
import { TodoItemInterface } from '../interfaces/todo-item.interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() item: TodoItemInterface;
  showFlag = true;

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {}

  deleteOne(id): void {
    this.todoService.deleteTodoItem(id).subscribe((it) => console.log(it));
    this.showFlag = false;
  }
}
