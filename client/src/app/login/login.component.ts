import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

import { User } from '../core/models/user.model';
import { ToastService } from '../core/services/toast.service';
import { RouteStateService } from '../core/services/route-state.service';
import { SessionService } from '../core/services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { UserContextService } from '../core/services/user-context.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;

  password: string;

  locale: string;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
    public translate: TranslateService,
    private userContextService: UserContextService
  ) { }

  ngOnInit() {
    this.userName = "";
    this.password = "";
    this.locale = this.sessionService.getItem("ng-prime-language");
  }

  onClickLogin() {
    // let user: User = this.userService.getUserByUserNameAndPassword(this.userName, this.password);
    console.log(`logging in: ${this.userName}`);
    this.authService.authenticate(this.userName, this.password).subscribe(
      () => {
        const user: User = {id: 1, username: 'admin', email: 'admin@aqui.br', password: 'lalalaki', birthdate: new Date('10/28/1992')};
        this.userContextService.setUser(user);
        this.routeStateService.add("Dashboard", '/main/dashboard', null, true);
        console.log( 'user authenticated sucessfully');
      },
      (error) => {
        console.error(error);
        this.toastService.addSingle('error', '', 'Invalid credentials.');
      }
    );

    return;
  }

  onLanguageChange($event) {
    this.locale = $event.target.value;
    if (this.locale == undefined || this.locale == null || this.locale.length == 0) {
      this.locale = "en";
    }
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(this.locale);
    this.sessionService.setItem("ng-prime-language", this.locale);
  }

}
