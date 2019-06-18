import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Component } from '@angular/Core';

@Injectable({providedIn: 'root'})
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(message: any) {
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}

