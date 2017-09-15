import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items : Array<string> = ['yellow', 'red','green','gray','black'];

  addItem(){
      this.items.push("blue");
      this.items[0] = "red";

  }
}
