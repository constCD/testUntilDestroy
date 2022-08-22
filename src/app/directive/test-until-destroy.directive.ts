import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Dropdown } from 'primeng/dropdown/dropdown';
import { fromEvent } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, filter } from 'rxjs/operators';

@UntilDestroy()
@Directive({
  selector: '[appTestUntilDestroy]',
})
export class TestUntilDestroyDirective implements AfterViewInit {
  @Input() appDropdownAssistant: Dropdown;
  private mutationOb: MutationObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.el.nativeElement.querySelector('div.s-p-dropdown input')?.removeAttribute('readonly');
    this.registerInputEvents();

    this.mutationOb = new MutationObserver(() => {
      if (this.appDropdownAssistant.overlayVisible) {
        this.callbackWhenOverlayVisible();
      }
    });

    this.mutationOb.observe(this.appDropdownAssistant.accessibleViewChild.nativeElement, {
      attributes: true,
      attributeFilter: ['aria-expanded'],
    });
  }

  private callbackWhenOverlayVisible(): void {
    this.registerFilterInputEvents();
  }

  private registerFilterInputEvents(): void {
    if (!this.appDropdownAssistant.filter) {
      return;
    }

    const filterInput = this.appDropdownAssistant.filterViewChild.nativeElement;

    fromEvent(filterInput, 'input')
      .pipe(untilDestroyed(this), debounceTime(300))
      .subscribe((_event: Event) => {
        this.appDropdownAssistant.cd.detectChanges();
      });

    fromEvent(filterInput, 'keydown')
      .pipe(
        untilDestroyed(this),
        filter((event: KeyboardEvent) => event.key === KeyBoardName.ENTER)
      )
      .subscribe((event: Event) => {
        event.stopPropagation();
        this.appDropdownAssistant.hide();
        this.el.nativeElement.querySelector('div.s-p-dropdown input')?.focus();
      });
  }

  private registerInputEvents(): void {
    const input = this.appDropdownAssistant.accessibleViewChild.nativeElement;
    input.removeAttribute('role');

    fromEvent(input, 'keydown')
      .pipe(
        untilDestroyed(this),
        filter((event: KeyboardEvent) => (event.code === KeyBoardName.ENTER || event.key === KeyBoardName.ARROW_DOWN) && !event.repeat)
      )
      .subscribe(() => {
        this.appDropdownAssistant.show();
        this.appDropdownAssistant.cd.detectChanges();
      });
  }
}


export enum KeyBoardName {
  ESC = 'Escape',
  TAB = 'Tab',
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  ENTER = 'Enter',
}
