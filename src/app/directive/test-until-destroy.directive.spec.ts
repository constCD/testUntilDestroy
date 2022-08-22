import * as rxjs from 'rxjs';
import { ElementRef } from '@angular/core';
import { TestUntilDestroyDirective } from './test-until-destroy.directive';
import { KeyBoardName } from './test-until-destroy.directive';

describe('TestUntilDestroyDirective', () => {
  let div: Element;
  let mockAppDropdownAssistant: any;

  beforeEach(() => {
    let html = `<div class="p-dropdown"><div class="p-hidden-accessible"><input aria-expanded="false" /></div></div>`;
    html += `<div class="p-dropdown-panel"><input class="p-dropdown-filter" /><ul class="p-dropdown-items">`;
    html += `<li class="p-dropdown-item" aria-label="item" aria-selected="true">item</li></ul></div>`;

    div = document.createElement('div');
    div.innerHTML = html;

    mockAppDropdownAssistant = {
      overlay: div.querySelector('.p-dropdown-panel'),
      overlayVisible: true,
      filter: false,
      accessibleViewChild: {
        nativeElement: div.querySelector('.p-hidden-accessible > input'),
      },
      filterViewChild: {
        nativeElement: div.querySelector('input.p-dropdown-filter'),
      },
      optionsToDisplay: [],
      onFilter: jest.fn(),
      show: jest.fn(),
      hide: jest.fn(),
      focus: jest.fn(),
      onInputFocus: jest.fn(),
      onInputBlur: jest.fn(),
      selectItem: jest.fn(),
      cd: {
        detectChanges: jest.fn(),
      },
      updateSelectedOption: jest.fn(),
    };

    jest.spyOn(rxjs, 'fromEvent').mockReturnValue(rxjs.of({}));
  });

  it('registerFilterInputEvents -> filter is true -> keydown event', async () => {
    jest.spyOn(rxjs, 'fromEvent').mockReturnValue(rxjs.of({ key: KeyBoardName.ENTER, stopPropagation: jest.fn() } as any));

    mockAppDropdownAssistant.filter = true;
    const directive = new TestUntilDestroyDirective(new ElementRef<any>(div));
    directive.appDropdownAssistant = mockAppDropdownAssistant;
    directive.ngAfterViewInit();

    await div.querySelector('.p-hidden-accessible > input')?.setAttribute('aria-expanded', 'true');
    expect(directive.appDropdownAssistant.hide).toHaveBeenCalled();
  });
});
