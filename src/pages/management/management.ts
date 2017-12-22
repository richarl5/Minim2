import { Component } from '@angular/core';
import {ToastController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'page-management',
  templateUrl: 'management.html',
})
export class ManagementPage {

  user = 'student';

  constructor(private http: HttpClient, public toastCtrl: ToastController) {
  }

  studentSubmit(name, age) {
    this.http.post('http://localhost:3001/api/student/add', { name: name, age: age}, {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe(data => {this.showToast("Student added!")}, (err) => {this.showToast("Student already exists!")});
  }


  subjectSubmit(name, studies, semester) {
    this.http.post('http://localhost:3001/api/subject/add', { name: name, studies: studies, semester: semester}, {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe(data => {this.showToast("Subject added success")}, (err) => {this.showToast("Subject already exists")});
  }

  private showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
