import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MD_DIALOG_DATA, MdDialogRef ,MaterialModule} from '@angular/material';
import { ValidationService } from "../../validation.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ValidationService]
})
export class AddProductComponent implements OnInit{

  constructor(public dialogRef: MdDialogRef<AddProductComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
      this.dialogRef.close();
    }
    save(){
      console.log(this.data); 
    }
    ngOnInit() {}
}
