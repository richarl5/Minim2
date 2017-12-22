import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {HttpClient} from "@angular/common/http";
import {Item, Loading, LoadingController, NavController, ToastController} from "ionic-angular";

@Component({
  selector: 'page-about',
  templateUrl: 'subject.html'
})
export class SubjectPage {

  subjects;
  error;
  loading: Loading;

  constructor(private http: HttpClient, public toastCtrl: ToastController, public navCtrl: NavController, public loadingCtrl: LoadingController) {
  }

  createLoader(message: string = "Please wait...") { // Optional Parameter
    this.loading = this.loadingCtrl.create({
      content: message
    });
  }

  ionViewDidLoad() {
    this.createLoader();
  }

  public allSubject() {
    this.createLoader();
    this.loading.present().then(()=>{
    this.http.get('http://localhost:3001/api/subject/all', {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(
      (data) => {
        this.loading.dismiss();
        this.subjects = data;
      }, (err) => {
        this.loading.dismiss();
        this.error = err;
        this.showToast("Subjects not found!")
      });
    });
  }

  public addSubject(subject, student){
    this.http.put('http://localhost:3001/api/subject/' + subject + '/update/student', {student: student}, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(
      (data) => {
        this.showToast("Usuari matriculat");
        this.allSubject();}, (err) => {this.error = err; this.showToast("Failed to add student to subject")});
  }

  public nameSearch(data) {
    this.createLoader();
    this.loading.present().then(()=>{
    this.http.get('http://localhost:3001/api/subject/' + data + '/read', {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(
      (data) => {
        this.loading.dismiss();
        this.subjects = data;
        }, (err) => {
        this.loading.dismiss();
        this.error = err;
        this.showToast("No match found")
      });
    });
  }

  public studySearch(data) {
    this.http.get('http://localhost:3001/api/subject/search/study/' + data, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(
      (data) => this.subjects = data, (err) => {this.error = err; this.showToast("No match found!")});
  }

  public semesterSearch(data) {
    this.http.get('http://localhost:3001/api/subject/search/semester/' + data, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(
      (data) => this.subjects = data, (err) => {this.error = err; this.showToast("No match found!")});
  }

  public sortedSearch() {
    this.http.get('http://localhost:3001/api/subject/search/sorted', {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(
      (data) => this.subjects = data, (err) => {this.error = err; this.showToast("No match found!")});
  }

  private showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage',{item: item, type: 'Subject'});
  }

}
