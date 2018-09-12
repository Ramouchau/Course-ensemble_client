import {Injectable, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { UserRegisterRequest, UserLoginResponse } from '../interfaces/auth-socket-interfaces'

import 'rxjs/add/operator/map';
import {Nav} from "ionic-angular";
import {ListPage} from "../pages/list/list";
import {CreatelistPage} from "../pages/createlist/createlist";


@Injectable()
export class PagesServices {


    @ViewChild(Nav) nav: Nav;
    pageList = {"createlist": CreatelistPage, "list" : ListPage};

    public openPage(name: string)
    {
        this.nav.push(this.pageList[name]);
    }
}