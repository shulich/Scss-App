import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FilterType } from './component/autocomplete/autocomplete.enum';
import { User } from './model/user';
import { UserService } from './service/user.service';
import { Enums, EnumsAware } from './enumsaware.decorator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@EnumsAware
export class AppComponent {

  public Enums: Enums = new Enums();

  title = 'scss-app';
  direction = "ltr";
  userList: User[] = [
    { id: 1, name: 'shulamit' },
    { id: 2, name: 'chagit' },
    { id: 3, name: 'chaya' },
    { id: 4, name: 'gilad' },
    { id: 5, name: 'rini' }
  ];

  constructor(private translate: TranslateService, private userService: UserService) {

    //this.userList = this.userService.loadUserList();

    translate.setDefaultLang('he');
    translate.use('he');
  }

  async ngOnInit() {
  }

  changeDirection() {
    debugger;
    if (this.direction == "ltr") {
      document.getElementsByClassName("container")[0].classList.add("rtl");
      this.direction = "rtl;"
    }
    else {
      document.getElementsByClassName("container")[0].classList.remove("rtl");
      this.direction = "ltr";
    }
  }

  userSelect(value) {
    debugger;
    if (value.isNewItem) {
      this.userList.push(value.item);
    }
  }

}
