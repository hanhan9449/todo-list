import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TodoService } from '../todo.service';
import { fromEvent, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('todoInput') todoInputEl: ElementRef;
  @ViewChild('inputForm') inputForm: ElementRef;
  inputSubscription: Subscription;
  submitSubscription: Subscription;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.inputEvent();
    this.submitEvent();
  }

  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe();
    this.submitSubscription.unsubscribe();
  }

  inputEvent(): void {
    const keyUp$ = fromEvent(this.todoInputEl.nativeElement, 'keyup').pipe(
      filter((e: KeyboardEvent) => e.key.toLowerCase() !== 'enter'),
      map((e: KeyboardEvent) =>
        (e.target as HTMLInputElement).value.replace(/ +/g, '')
      ),
      debounceTime(80),
      distinctUntilChanged()
    );
    this.inputSubscription = keyUp$.subscribe((v) => {
      this.todoService.inputTodoItem(v);
    });
  }

  submitEvent(): void {
    const keyUp$ = fromEvent(this.inputForm.nativeElement, 'submit').pipe(
      map(() => this.todoInputEl.nativeElement.value),
      switchMap((v) => this.todoService.submitTodoItem(v)),
      tap(() => {
        this.todoInputEl.nativeElement.value = '';
      })
    );
    this.submitSubscription = keyUp$.subscribe((it) => {
      console.log(it);
    });
  }
}
