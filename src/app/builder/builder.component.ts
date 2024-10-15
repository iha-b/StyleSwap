import { Component, OnInit } from '@angular/core';
import {UserEntriesService} from "../Services/user-entries.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  constructor(private entryService:UserEntriesService) { }
  categories = ["Head Wear", "Tops (upper body clothing)", "Bottoms", "Footwear"];
  ItemLists = {"Head Wear": [],
    "Tops (upper body clothing)": [],
    "Bottoms" : [],
    "Footwear" : []
  }
  imageLists = {"Head Wear": [],
    "Tops (upper body clothing)": [],
    "Bottoms" : [],
    "Footwear" : []
  }

  formCtrlList = {"Head Wear": new FormControl(),
    "Tops (upper body clothing)": new FormControl(),
    "Bottoms" : new FormControl(),
    "Footwear" : new FormControl()
  }

  visible = { display: "none"};


  ngOnInit(): void {

    this.categories.forEach(cat => {
      this.getEntriesByCategories(cat);
    })

    this.categories.forEach(cat => {
      this.formCtrlList[cat].valueChanges.subscribe(item => {
        console.log(item.get('name') + cat);
        this.imageLists[cat] = item.get('image').url();
        this.visible =  { display: "inline-grid"};
      })
    })

  }


  async getEntriesByCategories(category) {

    let result = await this.requestDataAndWait(category);
    console.log(result);
    this.ItemLists[category] = result;

  }

  async requestDataAndWait(category) {
    return await this.entryService.getEntriesByCategory(category);
  }
}
