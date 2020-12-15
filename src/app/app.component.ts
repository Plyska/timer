import { Component } from '@angular/core';
import { fromEvent, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Timer';
  buttonStartStop = document.getElementsByClassName('startStop');
  buttonWait = document.getElementsByClassName('wait');
  buttonReset = document.getElementsByClassName('reset');
  time = new Date(0);
  source = timer(0, 1000);
  check = true;
  
  startStopTimer(){
    if (this.check){
      this.source
      .pipe(takeUntil(fromEvent(this.buttonStartStop, 'click')))
      .subscribe(() => this.time.setSeconds(this.time.getSeconds() + 1 ));
      this.check = !this.check;
    }else {
      this.time = new Date(0);
      this.source
      .pipe(takeUntil(fromEvent(this.buttonStartStop, 'click')))
      .subscribe();
      this.check = !this.check;
    }
  }

  waitTimer(){
    this.source
    .pipe(takeUntil(fromEvent(this.buttonWait, 'dblclick')))
    .subscribe();
  }

  resetTimer(){
    if (this.check) {
    this.time = new Date(0);
    this.source
    .pipe(takeUntil(fromEvent(this.buttonReset, 'click')))
    .subscribe(() => this.time.setSeconds(this.time.getSeconds() + 1));
    this.check = !this.check;
    } else {
      this.time = new Date(0);
      this.source
      .pipe(takeUntil(fromEvent(this.buttonReset, 'click')))
      .subscribe();
    }
  }
}
