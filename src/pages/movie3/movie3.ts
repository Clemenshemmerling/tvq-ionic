import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { UserService } from '../../services/user';
/**
 * Generated class for the Movie3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie3',
  templateUrl: 'movie3.html',
})
export class Movie3Page {

  user: any = JSON.parse(localStorage.getItem('user'));
  show:boolean = false;
  test: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private payPal: PayPal, private userService: UserService) {
    if(this.user.EtEdYTjLSUJfq72s == true) {
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
        let payment = new PayPalPayment('0.99', 'USD', 'La Casa de Enfrente', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          this.userService.updateUser(this.user.uid, {
            EtEdYTjLSUJfq72s: true
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
    console.log('ionViewDidLoad Movie3Page');
  }

}
