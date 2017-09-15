import { HostListener, Directive, ElementRef, Renderer2, Input, HostBinding } from '@angular/core';

@Directive({
  selector: 'input[appEnglishOnly]'
})
export class EnglishOnlyDirective {


  @HostListener("keypress",['$event'])
  changetext(){
    let code=event['keyCode'];
    let key=event['key'];
    let n: number = 0;
   
    if(!((code>=65&&code<=90)||(code>=97&&code<=122))){
      this.element.nativeElement.style.borderColor = "red";
     
     window.setTimeout(()=>{
      this.element.nativeElement.style.borderColor = "none";
     },2000);
         event.preventDefault();                                                              
         console.log(key);
       
    }
  }
  constructor(private element: ElementRef, private renderer: Renderer2) { }

}
