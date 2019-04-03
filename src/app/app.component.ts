import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {


  title = 'scss-app';
  direction = "ltr";
  
  constructor(private translate: TranslateService, private userService: UserService) {
    translate.setDefaultLang('he');
    translate.use('he');
  }

  changeDirection() {
    if (this.direction == "ltr") {
      document.getElementsByClassName("container")[0].classList.add("rtl");
      this.direction = "rtl;"
    }
    else {
      document.getElementsByClassName("container")[0].classList.remove("rtl");
      this.direction = "ltr";
    }
  }

 }
