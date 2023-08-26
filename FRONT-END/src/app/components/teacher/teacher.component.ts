import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  selectedButton: string = 'Dashboard';

  constructor(
    private route: Router,
  ) { }

  ngOnInit(): void {
  }

  showFiller = false;
  tabSelected(buttonValue: string){
    console.log('first', buttonValue);
    this.selectedButton = buttonValue;
    // this.route.navigate(['/departments'])
  }


  logout() {
    localStorage.clear();
    this.route.navigate(['/']);
  }
}
