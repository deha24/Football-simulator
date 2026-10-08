import { Component, OnInit, Output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor() { }

  ngOnInit() { }

  protected readonly title = signal('FootballSimulator');
}
