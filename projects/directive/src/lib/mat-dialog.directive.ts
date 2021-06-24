import { AfterViewInit, Directive, Input, OnDestroy, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, EMPTY, fromEvent, Observable, ReplaySubject } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

type Trigger = HTMLElement;

interface Context<D> {
  $implicit: D;
  dialogRef: MatDialogRef<any, any>;
}

@Directive({
  selector: '[libMatDialog]',
})
export class MatDialogDirective<D> implements AfterViewInit, OnDestroy {
  private readonly triggerSubject = new ReplaySubject<Trigger>(1);
  private readonly dataSubject = new BehaviorSubject<any>(undefined);
  private readonly configSubject = new BehaviorSubject<any>(undefined);

  @Input('libMatDialogTriggeredBy') set trigger(value: Trigger) {
    console.log('libMatDialogTriggeredBy', value);
    this.triggerSubject.next(value);
  }

  @Input('libMatDialogIs') set data(value: any) {
    console.log('libMatDialogIs', value);
    this.dataSubject.next(value);
  }

  @Input('libMatDialogConfigFrom') set config(value: any) {
    console.log('libMatDialogConfigFrom', value);
    this.configSubject.next(value);
  }

  constructor(
    private readonly template: TemplateRef<Context<D>>,
    private readonly dialog: MatDialog,
  ) {
  }

  private getTriggerObservable(trigger: Trigger): Observable<unknown> {
    console.log({ trigger });
    if (trigger instanceof HTMLElement) {
      console.log(1);
      return fromEvent(trigger, 'click');
    } else {
      console.log(2);
      return EMPTY;
    }
  }

  ngAfterViewInit(): void {
    this.triggerSubject.pipe(
      tap(console.log),
      switchMap(trigger => this.getTriggerObservable(trigger)),
      tap(console.log),
      withLatestFrom(this.configSubject, this.dataSubject),
      tap(console.log),
      tap(([ , config, data ]) => this.dialog.open(this.template, { ...config, data })),
    ).subscribe(
      v => console.log('next', v),
      v => console.log('error', v),
      () => console.log('complete'),
    );
  }

  ngOnDestroy(): void {
    this.triggerSubject.complete();
    this.dataSubject.complete();
    this.configSubject.complete();
  }

  static ngTemplateContextGuard<D>(dir: MatDialogDirective<D>, ctx: unknown): ctx is Context<D> {
    return true;
  };

}
