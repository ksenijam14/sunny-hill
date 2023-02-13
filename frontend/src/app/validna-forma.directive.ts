import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appValidnaForma]'
})
export class ValidnaFormaDirective {

  constructor() { }

  @Output()
    ngInit: EventEmitter<any> = new EventEmitter();
    
  ngOnInit() {
    this.ngInit.emit();
}

}
