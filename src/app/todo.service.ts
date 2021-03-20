import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { TodoItemInterface } from './interfaces/todo-item.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  input$ = new Subject<string>();
  count!: number;
  list: TodoItemInterface[];
  list$: BehaviorSubject<TodoItemInterface[]>;
  filteredList$: BehaviorSubject<TodoItemInterface[]>;

  constructor() {
    this.count = +localStorage.getItem('count') || 0;
    this.list = JSON.parse(localStorage.getItem('todos')) || [];
    this.list$ = new BehaviorSubject<TodoItemInterface[]>(this.list);
    this.filteredList$ = new BehaviorSubject<TodoItemInterface[]>(this.list);
    this.input$.pipe().subscribe((m) => {
      const re = new RegExp(m, 'i');
      this.filteredList$.next(this.list.filter((v) => re.test(v.title)));
    });
  }

  inputTodoItem(s: string): any {
    this.input$.next(s);
  }

  submitTodoItem(s: string): Observable<TodoItemInterface> {
    const ret = { title: s, id: this.count };
    ++this.count;
    this.list.push(ret);
    this.updateLocalData();
    this.input$.next('');
    return of(ret);
  }

  deleteTodoItem(id: number): Observable<boolean> {
    for (let i = 0; i < this.list.length; ++i) {
      if (this.list[i].id === id) {
        this.list.splice(i, 1);
        this.updateLocalData();
        return of(true);
      }
    }
    return of(false);
  }

  updateLocalData(): void {
    localStorage.setItem('todos', JSON.stringify(this.list));
    localStorage.setItem('count', this.count.toString());
  }
}
