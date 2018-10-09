import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { UserToken } from '../../interfaces/auth-socket-interfaces';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	public user: UserToken = {
    id: 0,
    email: "",
    username: ""
  };
  title = 'Tour of Heroes';
	public createList() {
	  console.log(this.user, "bite")
	}

  constructor(public navCtrl: NavController, public navParams: NavParams,  private auth: AuthService) {
    this.auth.getUser().subscribe((res: UserToken) => {
			this.user = res;
			console.log(this.user);
		}, (err: string) => {
        console.error("mdr tu t'es fait déco");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
