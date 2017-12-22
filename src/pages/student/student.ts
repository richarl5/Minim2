import { Component } from '@angular/core';
import {Item, Loading, LoadingController, NavController, ToastController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'page-student',
  templateUrl: 'student.html'
})
export class StudentPage {

  students;
  error;
  loading: Loading;

  constructor(private http: HttpClient,  public toastCtrl: ToastController, public navCtrl: NavController, public loadingCtrl: LoadingController) {
  }

  createLoader(message: string = "Please wait...") {
    this.loading = this.loadingCtrl.create({
      content: message
    });
  }

  ionViewDidLoad() {
    this.createLoader();
  }

  public allStudents() {
    this.createLoader();
    this.loading.present().then(()=>{
    this.http.get('http://localhost:3001/api/student/all', {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(
      (data) => {
        this.loading.dismiss();
        this.students = data;
        }, (err) => {
        this.loading.dismiss();
        this.error = err; let toast = this.toastCtrl.create({
          message: "Students not found!",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    });
  }

  public oneStudent(student) {
    this.createLoader();
    this.loading.present().then(()=>{
    this.http.get('http://localhost:3001/api/student/' + student + '/read', {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(
      (data) => {
        this.loading.dismiss();
        this.students = data;
      }, (err) => {
        this.loading.dismiss();
          this.error = err; let toast = this.toastCtrl.create({
            message: "Student not found!",
            duration: 3000,
            position: 'top'
          });
          toast.present();
      });
    });
  }

  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage',{item: item, type: 'Student'});
  }
}
