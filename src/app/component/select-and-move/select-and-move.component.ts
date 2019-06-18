import {Component, Input, OnInit} from '@angular/core';
import {array} from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-select-and-move',
  templateUrl: './select-and-move.component.html',
  styleUrls: ['./select-and-move.component.scss']
})
export class SelectAndMoveComponent implements OnInit {
  @Input() leftTitle: string;
  @Input() rightTitle: string;
  @Input() leftItems: any[];
  @Input() rightItems: any[];


  /*leftItems = [
    {name: 'Item left 1', id: 1, selected: false},
    {name: 'Item left 2', id: 2, selected: false},
    {name: 'Item left 3', id: 3, selected: false},
    {name: 'Item left 4', id: 4, selected: false},
    {name: 'Item left 5', id: 5, selected: false},
    {name: 'Item left 6', id: 6, selected: false},
  ];

  rightItems = [
    {name: 'Item right 1', id: 1, selected: false},
    {name: 'Item right 2', id: 2, selected: false},
    {name: 'Item right 3', id: 3, selected: false},
    {name: 'Item right 4', id: 4, selected: false},
    {name: 'Item right 5', id: 5, selected: false},
    {name: 'Item right 6', id: 6, selected: false},
  ];*/

  constructor() {
  }

  ngOnInit() {
  }

  toggleItemSelection(item) {
    item.selected = !item.selected;
  }

  moveSelectedToLeft() {
    const selectedItems = this.rightItems.filter((rightItem) => {
      return rightItem.selected;
    });

    this.rightItems = this.rightItems.filter((rightItem) => {
      return !rightItem.selected;
    });

    this.leftItems = [...selectedItems.map((item) => {
      item.selected = false;
      return item;
    }), ...this.leftItems];
  }

  moveSelectedToRight() {
    const selectedItems = this.leftItems.filter((leftItem) => {
      return leftItem.selected;
    });

    this.leftItems = this.leftItems.filter((leftItem) => {
      return !leftItem.selected;
    });

    this.rightItems = [...selectedItems.map((item) => {
      item.selected = false;

      return item;
    }), ...this.rightItems];

  }

  moveAllToRight() {
    this.rightItems = [...this.leftItems, ...this.rightItems];
    this.rightItems = this.rightItems.map((item) => {
      item.selected = false;

      return item;
    });
    this.leftItems = [];
  }

  moveAllToLeft() {
    this.leftItems = [...this.rightItems, ...this.leftItems];
    this.leftItems = this.leftItems.map((item) => {
      item.selected = false;

      return item;
    });
    this.rightItems = [];
  }
}
