import { Component } from '@angular/core';

import { SubjectPage } from '../subject/subject';
import { StudentPage } from '../student/student';
import { HomePage } from '../home/home';
import {ManagementPage} from "../management/management";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = StudentPage;
  tab3Root = SubjectPage;
  tab4Root = ManagementPage;

  constructor() {

  }
}
