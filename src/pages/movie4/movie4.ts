import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { UserService } from '../../services/user';
/**
 * Generated class for the Movie4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie4',
  templateUrl: 'movie4.html',
})
export class Movie4Page {

  user: any = JSON.parse(localStorage.getItem('user'));
  show:boolean = false;
  test: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private payPal: PayPal, private userService: UserService) {
    if(this.user.yA8L4gr6ktjtMWSD == true) {
      this.show = true;
    } else {
      this.show = false;
    }          
  }

  pay() {
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'ARYPX-tTyzaw-_bvh2WQ4DkGRCvFrF43v_DRhfLG_GjY_S5ufjaxQNvcA5NpquGdpp-M_z2Ti5gYtzDq'
    }).then(() => {
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      })).then(() => {
        let payment = new PayPalPayment('0.99', 'USD', 'Las Cruces', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          this.userService.updateUser(this.user.uid, {
            yA8L4gr6ktjtMWSD: true
          }).then(() => {
            this.show = true;
          });
        }, () => {
        });
      }, () => {
      });
    }, () => {
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Movie4Page');
  }

}
