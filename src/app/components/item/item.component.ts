import { DataObj } from './../../DataObj';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() obj: DataObj;
  @Input() deleteItem: (args: any) => void;

  constructor() {}

  delete() {
    if(confirm("Do you wish to delete?")) {
      this.deleteItem(this.obj);
    }
  }

  ngOnInit(): void {
  }
}
