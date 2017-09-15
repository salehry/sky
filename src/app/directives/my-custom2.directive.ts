import { HostListener, Directive, ElementRef, Renderer2, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appMyCustom2]'
})
export class MyCustom2Directive {

 
  @Input()
  defaultCurser: string = "none";

  @HostBinding("style.cursor")
  selectedCursor : string;


  @HostBinding("hidden")
  isHidden : Boolean = false;

  @HostListener("mouseover")
  setPointer(){
    this.selectedCursor = this.defaultCurser;
  }
  @HostListener("click",['$event'])
  hideelement(){
    this.isHidden=true;
  }
 




}
