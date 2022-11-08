import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/global/models/tasks/item.model';
import { ItemsService } from 'src/app/global/services/item-shop/item-shop.service';


@Component({
  selector: 'item-shop',
  templateUrl: './item-shop.component.html',
  styleUrls: ['./item-shop.component.scss']
})
export class ItemShopComponent implements OnInit {
  protected imagePath: string = "\assets\\";
  protected items: ItemModel[] = [];
  protected selectedItem: ItemModel = new ItemModel({
    name: "",
    description: "",
    image: "",
    price: -1,
    rating: -1,
    isAvailable: false,
    selected: false
  });

  constructor(private itemsService: ItemsService) { }

  async ngOnInit(){
    this.itemsService.getAll().subscribe((result) => {
      console.log(result);
      this.items = result;
      if(this.items.length > 0)
        this.selectedItem = this.items[0];
    });

  }

  public onItemClick(item: ItemModel){
    this.items.forEach(item => {item.selected = false});

    this.selectedItem = item; 
    item.selected = true;
  }
}
