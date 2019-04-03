import { Component, OnInit } from '@angular/core';
import { Enums } from 'src/app/enumsaware.decorator';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Result } from '../autocomplete/autocomplete.model';


@Component({
  selector: 'app-parent-autocomplete',
  templateUrl: './parent-autocomplete.component.html',
  styleUrls: ['./parent-autocomplete.component.scss']
})
export class ParentAutocompleteComponent implements OnInit {

  public Enums: Enums = new Enums();
  userList: User[];
  subscription: Subscription;

  constructor(private userService: UserService, private translate: TranslateService) {
    this.userList=this.userService.loadUserList();
   }

  async ngOnInit() {
    this.subscription = this.userService.userList.subscribe(
      data => {
          this.userList = data;
      }
  );
  }

  userSelect(value: Result) {
    if (value.isAddNewItem) {
      this.userService.addUser(value.item);
    }
  }
}
