import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hod',
  templateUrl: './hod.component.html',
  styleUrls: ['./hod.component.css'],
})
export class HodComponent implements OnInit {
  selectedButton: string = 'Dashboard';

  constructor(
    private route: Router,
  ) { }

  ngOnInit(): void {
  }

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
