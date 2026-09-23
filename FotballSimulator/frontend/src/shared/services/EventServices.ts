import { inject, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
  })
export class EventService {
  private eventSubject = new Subject();

  emitEvent(eventName: string, payload?: any) {
    this.eventSubject.next({ eventName, payload });
  }

  getEvent(eventName: string, callback: (event: any) => void) {

    this.eventSubject.asObservable().subscribe((event: any) => {
      if (event.eventName === eventName) {
        callback(event.payload);
      }
    });
  }
}
