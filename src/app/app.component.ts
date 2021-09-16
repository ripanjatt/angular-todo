import { DataObj } from './DataObj';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('title') title: ElementRef;
  @ViewChild('form') form: ElementRef;
  @ViewChild('desc') desc: ElementRef;
  @ViewChild('date') date: ElementRef;
  @ViewChild('img') img: ElementRef;

  list: DataObj[] = [];

  ngOnInit(): void {
    if(sessionStorage.getItem("data") != null) {
      this.list = JSON.parse(sessionStorage.data);
    }
  }

  addItem() {
    if(this.title.nativeElement.value == ""
      || this.desc.nativeElement.value == ""
      || this.date.nativeElement.value == ""
    ) {
      alert("Required field empty!");
    } else if(this.img.nativeElement.files[0].size > 409600) {
      alert("Photo too big!");
    } else {
      document.getElementById("close")?.click();
      if(this.img.nativeElement.value == "") {
        var temp: DataObj = {
          title: this.title.nativeElement.value,
          desc: this.desc.nativeElement.value,
          date: this.date.nativeElement.value,
          img: "../../assets/images/default.jpg"
        }
        this.updateToStorage(temp);
      } else {
        var reader = new FileReader();
        reader.addEventListener("load", (event: any) => {
          var temp: DataObj = {
            title: this.title.nativeElement.value,
            desc: this.desc.nativeElement.value,
            date: this.date.nativeElement.value,
            img: event.target.result
          }
          this.updateToStorage(temp);
        });
        reader.readAsDataURL(this.img.nativeElement.files[0]);
      }
    }
  }

  deleteItem(item: DataObj) {
    this.list.splice(this.list.indexOf(item), 1);
    sessionStorage.setItem("data", JSON.stringify(this.list));
  }

  updateToStorage(item: DataObj) {
    this.list.push(item);
    sessionStorage.setItem("data", JSON.stringify(this.list));
    this.title.nativeElement.value = "";
    this.desc.nativeElement.value = "";
    this.date.nativeElement.value = "";
    this.img.nativeElement.value = "";
  }
}
