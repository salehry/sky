import { HostListener, Directive, ElementRef, Renderer2, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appMyCustom]'
})
export class MyCustomDirective {

  private count: number = 0;
  @Input()
  defaultColor: string = "blue";
  @Input()
  otherColor: string = "red";

  @HostBinding("style.backgroundColor")
  selectedColor : string;

  @HostListener("mouseout")
  changeColorToDefault(){
    this.selectedColor = this.defaultColor;
  }

  @HostListener("mouseover")
  changeColorToOther(){
    this.selectedColor = this.otherColor;
  }



  constructor(private element: ElementRef, private renderer: Renderer2) {
   
  //   //element.nativeElement.style.backgroundColor = "red";
  //   // renderer.listen(element.nativeElement, "mouseover", x => {
  //   //   //renderer.setStyle(element.nativeElement, "background-color", this.otherColor);
  //   //   this.selectedColor = this.otherColor;
  //   // });
  //   // renderer.listen(element.nativeElement, "mouseout", x => {
  //   //   this.selectedColor = this.defaultColor;
  //   //   //renderer.setStyle(element.nativeElement, "background-color", this.defaultColor);
  //   // });
 
   }

}
