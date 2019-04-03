import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ElementRef } from '@angular/core';
import { MatAutocomplete } from '@angular/material';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { FilterType,  } from './autocomplete.enum';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { Result } from './autocomplete.model';

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


  keyup(query: string) {

      if(query == undefined) return;

      let filterItems = this.items.filter(item => this.filter(query, item));

      if (this.isDisplayNewItem && isNaN(parseInt(query))) {//check only if the query not number
        //check if the word is the same as an existing word
        let isExitSameWord = this.items.filter(item => item[this.fieldName].toLowerCase() == query.toLowerCase()).length == 1;
        if (!isExitSameWord) {
            filterItems.unshift(this.getNewItem(query));
        }
      }
      return filterItems;
  }

  onselect(value: any) {

    //check if the word is new and isDisplayNewItem=true
    if (this.isDisplayNewItem && value != undefined && this.newUserId == value[this.fieldId]) {
      //cut 'new' word
      value[this.fieldName] = value[this.fieldName].slice(0, value[this.fieldName].length - 3);
      this.onSelect.emit(new Result(true,value));
    }
    else {
      this.onSelect.emit(new Result(false,value));
    }

    if (this.userFilterInput != undefined) {
      this.userFilterInput.nativeElement.value = value ? value[this.fieldName] : undefined;
    }
  }

  filter(query: any, item: any) {
    //filter by type: startsWith/byName/byNameOrId
    return (this.filterType == FilterType.startsWith && 
                  item[this.fieldName].toLowerCase().startsWith(query.toLowerCase())) ||
           (this.filterType == FilterType.byName &&
                  item[this.fieldName].toLowerCase().includes(query.toLowerCase())) ||
           (this.filterType == FilterType.byNameOrId &&
                  (item[this.fieldName].toLowerCase().includes(query.toLowerCase()) ||
                   item[this.fieldId].toString() == query));
  }

  getNewItem(query: string) {
    //create new item by fieldId and fieldName
    let newItem = {};
    this.newUserId = this.items[this.items.length - 1][this.fieldId] + 1;
    newItem[this.fieldId] = this.newUserId;
    newItem[this.fieldName] = query + "new";
    return newItem;
  }

}
