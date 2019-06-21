import {Directive, ElementRef, HostListener} from '@angular/core';
import * as screenfull from 'screenfull';

@Directive({
  selector: '[appFullScreen]'
})
export class ToggleFullScreenDirective {
  constructor(private elements: ElementRef) {}

  @HostListener('click', ['$event.target'])
  onClick() {
    if (screenfull.enabled) {
      (this.elements).nativeElement.querySelector('.feather').classList.toggle('icon-maximize');
      (this.elements).nativeElement.querySelector('.feather').classList.toggle('icon-minimize');
      screenfull.toggle();
    }
  }
}
