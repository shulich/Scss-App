import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ElementRef } from '@angular/core';
import { MatAutocomplete } from '@angular/material';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { FilterType } from './autocomplete.enum';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AutocompleteComponent,
    multi: true
  }]
})

export class AutocompleteComponent implements OnInit {

  filteredItems: Observable<any[]>;
  newUserId;
  query: any;

  @Input() filterType: FilterType = FilterType.startsWith;
  @Input() fieldName: string = "name";
  @Input() fieldId: string = "id";
  @Input() items: any[];
  @Input() isDisplayNewItem: boolean;

  @Output() onSelect = new EventEmitter();
  @ViewChild(MatAutocomplete) pAutoComplete: MatAutocomplete;
  @ViewChild('userFilterInput') userFilterInput: ElementRef;
  public myControl = new FormControl();


  constructor() { }

  ngOnInit() {
      this.filteredItems = this.myControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value[this.fieldName]),
        map(query => query ? this.keyup(query) : this.items.slice())
      );
  }


  keyup(query) {
    if (query != undefined) {
      let filterItems = this.items.filter(item =>
        this.filter(query, item));

      if (this.isDisplayNewItem && isNaN(parseInt(query))) {//check only if the query not number
        let isExitSameWord = this.items.filter(item => item[this.fieldName].toLowerCase() == query.toLowerCase()).length == 1;
        if (!isExitSameWord) {
          let newItem = {};
          this.newUserId = this.items[this.items.length - 1][this.fieldId] + 1;
          newItem[this.fieldId] = this.newUserId;
          newItem[this.fieldName] = query + "new";
          filterItems.unshift(newItem);
        }
      }
      return filterItems;
    }
  }

  onselect(value) {
    if (this.isDisplayNewItem && value != undefined && this.newUserId == value[this.fieldId]) {
      value[this.fieldName] = value[this.fieldName].slice(0, value[this.fieldName].length - 3);
      this.onSelect.emit({ "isNewItem": true, "item": value });
    }
    else {
      this.onSelect.emit({ "isNewItem": false, "item": value });
    }
    if (this.userFilterInput != undefined) {
      this.userFilterInput.nativeElement.value = value ? value[this.fieldName] : undefined;
    }
  }

  filter(query: any, item: any) {
    return (this.filterType == FilterType.startsWith &&
      item[this.fieldName].toLowerCase().startsWith(query.toLowerCase())) ||
      (this.filterType == FilterType.byName &&
        item[this.fieldName].toLowerCase().includes(query.toLowerCase())) ||
      (this.filterType == FilterType.byNameOrId &&
        (item[this.fieldName].toLowerCase().includes(query.toLowerCase()) ||
          item[this.fieldId].toString() == query));
  }

}
