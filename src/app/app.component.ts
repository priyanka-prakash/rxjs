import { Component, OnInit} from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { ConfigService} from './services/config.service';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import {interval } from 'rxjs';
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'demo-rxjs';
  totalAngularPackages;

  constructor(private http: ConfigService) { }

  ngOnInit() {    
    
    
    // mouse hover event

    // const el = document.getElementById('my-element');

    // // Create an Observable that will publish mouse movements
    // const mouseMoves = fromEvent(el, 'mousemove');

    // // Subscribe to start listening for mouse-move events
    // const subscription = mouseMoves.subscribe((evt: MouseEvent) => {
    //   // Log coords of mouse movements
    //   console.log(`Coords: ${evt.clientX} X ${evt.clientY}`);

    //   // When the mouse is over the upper-left of the screen,
    //   // unsubscribe to stop listening for mouse movements
    //   if (evt.clientX < 40 && evt.clientY < 40) {
    //     subscription.unsubscribe();
    //   }
    // });
    
    


  }

  interval(){
    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(1000);
    // Subscribe to begin publishing values
    secondsCounter.subscribe(n =>
      console.log(`It's been ${n} seconds since subscribing!`));
  }

 
  showDatas(){
    this.http.getDatas().subscribe((data:any) => {
        this.totalAngularPackages = data.total;
        console.log(data);
    })
  }

  dataPromise(){
    // Create an Observable out of a promise
    const data = from(fetch('/api/endpoint'));
    // Subscribe to begin listening for async result
    data.subscribe({
      next(response) { console.log(response); },
      error(err) { console.error('Error: ' + err); },
      complete() { console.log('Completed'); }
    });
     
  }


  ajax_Observable(){
    // Create an Observable that will create an AJAX request
    const apiData = ajax('/api/data');
    // Subscribe to create the request
    apiData.subscribe(res => console.log(res.status, res.response));
  }


  of_map(){
    
    map(( x:number )=> x * x)(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));
  }

  first_of(){
    first()(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));
  }
  

}
