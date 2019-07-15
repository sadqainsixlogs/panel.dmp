import { Component, OnInit } from '@angular/core';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { ClothesService } from './clothes.service';
import { getOpts } from 'sweetalert/typings/modules/options';
const swal: SweetAlert = _swal as any;
import * as xml2js from "xml2js";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public backgroundColor: string;
  public fontColor: string;
  public linkColor: string;
  selectedfile = null;
  public imagePath;
  imgURL: any;
  public message: string;
  encoded: any
  nameitem: any = '';
  clothtypes;
  colors: any = [];
  shades;
  patterns;
  login: boolean = false;
  patternspecial;
  append: any = "data:image/jpeg;base64,";
  ccc: any = "";
  clothObject = {
    "clothImage": this.append + "",
    "clothName": "",
    "color": "",
    "shade": "",
    "fitting": "",
    "pattern": "",
    "patternSpecial": "",
    "patternColor": "",
    "colorTag": "",
    "type": ""
  }
  userObject = {
    "username": "",
    "password": ""
  }
  naam: any;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private paneldetail: ClothesService) {

    this.getClothdetails();
    // this.go();
    
    
    this.naam=localStorage.getItem('Username');
    if (localStorage.getItem('accesstoken')) {
      this.login = true;
      this.naam=localStorage.getItem('Username');
    } else {
      this.login = false;
      this.naam=localStorage.getItem('Username');
    }
  }
  getClothdetails() {

    // this.navCtrl.push(QuestionsPage);
    this.paneldetail.getdetails().subscribe((res) => {
      this.clothtypes = res.data.clothTypes;
      //  this.colors=res.data.colors;
      //  console.log('dasdasdasdadasdas',this.colors);
      this.shades = res.data.shades;
      this.patterns = res.data.patterns;
      this.patternspecial = res.data.patternSpecials;


    });

  }
  // go(){
  //   this.paneldetail.postData().subscribe((res)=>{
  //     xml2js.parseString(res);
  //   console.log(res);
  //   });
  // }
  ngOnInit() {
    this.backgroundColor = '#fff';
    this.fontColor = '#222';
    this.linkColor = '#fff';
  }

  /**
   * Set color from color picker
   * @param {string} type
   * @param {string} color
   */
  public setColor(type: string, color: string) {
    switch (type) {
      case 'background':
        this.backgroundColor = color;
        break;
      case 'font':
        this.fontColor = color;
        break;
      case 'link':
        this.linkColor = color;
        break;
      default:
        break;
    }

  }

  preview(files) {
    if (files.length === 0)
      return;
    this.nameitem = files[0].name.split(".")[0];

    console.log(this.nameitem)
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.encoded = this.imgURL.toString();
      // console.log(this.encoded);
    }
  }

  done() {
    this.spinnerService.show();
    this.clothObject.colorTag = localStorage.getItem('Ctag');
    console.log(this.colors.hex);
    this.clothObject.color = localStorage.getItem('Cname');
    this.clothObject.clothImage = this.encoded;
    this.clothObject.clothName = this.nameitem
   this.clothObject.patternColor = this.linkColor;
    // console.log(this.clothObject);
    this.paneldetail.postdeatil(this.clothObject).subscribe((res) => {
      console.log(res)
      if (res.status == 0) {
        this.failed();
        this.spinnerService.hide();
      } else {
        // console.log(this.spinnerService.show())
        // this.spinnerService.show();
        this.allgood();
        this.clothObject.clothImage = '';
        this.clothObject.clothName = '';
        this.clothObject.color = '';
        this.clothObject.patternColor = '';
        this.clothObject.patternSpecial = '';
        this.clothObject.shade = '';
        this.clothObject.type = '';
        this.clothObject.fitting = '';
        this.clothObject.pattern = '';
        this.backgroundColor = '';
        this.linkColor = '';
        this.nameitem = '';
        this.encoded = '';
        this.imgURL = '';
        this.clothObject.colorTag = '';
        localStorage.removeItem('Ctag');
        localStorage.removeItem('Cname')
        this.spinnerService.hide();
      }
      // console.log(this.ccc)
    })
  }
  allgood() {
    swal("Successful", "Record has been saved", "success");
  }
  failed() {
    swal("Oopss", "Something went Wrong", "error");
  }

  loginFunction() {

    console.log('object', this.userObject);
    this.paneldetail.addsignin(this.userObject).subscribe((res) => {
      // console.log(res)
      if (res.status == '0') {
        swal("Oopss", res.message, "error");
        // this.loginfailToast(res.message);
      } else if (res.userExist.active == false) {
        swal("Oopss", res.message, "error");


        // } else if (res.userExist.isFirstlogin == false) {

        //   this.signinNav();
        //   this.presentToast();
        //   this.userObject.username = '';
        //   this.userObject.password = '';
        //   localStorage.setItem('accesstoken', res.token.access_token);
        //   localStorage.setItem('Refreshtoken', res.token.refresh_token);
        //   localStorage.setItem('tokenExpiry', res.token.expires_in);
        //   localStorage.setItem('UserID', res.userExist.id);
        //   localStorage.setItem('Username', res.userExist.fullName);
        //   localStorage.setItem('temp', res.userExist.settings.temp);
        //   localStorage.setItem('email', res.userExist.email);
        //   localStorage.setItem('phone',res.userExist.number)
        //   localStorage.setItem('FL',res.userExist.isFirstlogin)




      }
      else {

        this.login = true;
        // swal("Successful",res.message, "success");
        this.userObject.username = '';
        this.userObject.password = '';
        localStorage.setItem('accesstoken', res.token.access_token);
        localStorage.setItem('Username', res.userExist.fullName);
        this.naam=localStorage.getItem('Username');
        // this.events.publish('setimagename');
        // localStorage.setItem('Refreshtoken', res.token.refresh_token);
        // localStorage.setItem('tokenExpiry', res.token.expires_in);
        // localStorage.setItem('UserID', res.userExist.id);
        // localStorage.setItem('Username', res.userExist.fullName);
        // localStorage.setItem('temp', res.userExist.settings.temp);
        // localStorage.setItem('email', res.userExist.email);
        // localStorage.setItem('phone',res.userExist.number);
        // localStorage.setItem('FL',res.userExist.isFirstlogin)


      }
    });
  }
  logout() {
    localStorage.clear();
    this.login = false;
  }

}
