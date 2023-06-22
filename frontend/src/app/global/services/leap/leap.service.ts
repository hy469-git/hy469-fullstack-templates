import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
// @ts-ignores
import * as Leap from 'leapjs';

/***********************************************/

export interface CursorPos {
  xPos: number;
  yPos: number;
}

/***********************************************/

export enum Gestures {
  SWIPE_LEFT,
  SWIPE_UP,
  SWIPE_DOWN,
  SWIPE_RIGHT,
  CIRCLE_CLOCKWISE,
  CIRCLE_COUNTERCLOCKWISE,
  PINCH
}

/***********************************************/

@Injectable({
  providedIn: 'root'
})
export class LeapService {

  private GesturesStr: string[] = [
    "SWIPE_LEFT",
    "SWIPE_UP",
    "SWIPE_DOWN",
    "SWIPE_RIGHT",
    "CIRCLE_CLOCKWISE",
    "CIRCLE_COUNTERCLOCKWISE",
    "PINCH",
  ];


  /*****************************/

  private timeoutAfterRecognition = 3000; //ms change according to how much time you need to wait from one gesture to the next
  private framesForGesture = 3;

  /*****************************/

  private positionEvent!: EventEmitter<CursorPos>;
  private gestureEvent!: EventEmitter<Gestures>;

  /*****************************/
  public gestureRecognized: string;
  /*****************************/

  constructor() {
    var controllerOptions = { enableGestures: true };
    this.gestureRecognized = "";
    this.initializeEmmiters();

    (Leap as any).loop(controllerOptions, (frame:any) => {
      let cursor = this.leapLoop(frame);
      var gesture = this.findGesture(frame);

      if (gesture != null)
        this.gestureEvent.emit(gesture);

      if (cursor)
        this.positionEvent.emit(cursor);
    });

  }

  /*****************************/

  public cursorRecognizer(): Observable<CursorPos> {
    return this.positionEvent;
  }

  public gestureRecognizer(): Observable<Gestures> {
    return this.gestureEvent;
  }

  /*****************************/

  private leapLoop(frame:any): CursorPos {

    if (frame.pointables && frame.pointables.length == 0)
      return null as any;

    // Currently using palm as cursor. Use pointables[0].tipPosition if you want to use your index finger as cursor
    var normalizedPosition = frame.interactionBox.normalizePoint(frame.hands[0].palmPosition, true);

    if (normalizedPosition[2] < 0.2 || normalizedPosition[2] > 0.8)
      return null as any;
    this.findPinch(frame);
    return {
      xPos: Math.trunc(normalizedPosition[0] * window.innerWidth),
      yPos: Math.trunc(window.innerHeight - normalizedPosition[1] * window.innerHeight)
    };
  }

  /*****************************/

  private gestureCounter = 0;
  private currGesture!: string;

  /**
   * This function can be edited in order to implement more advanced gesture handling features
   *
   */
  private findGesture(frame:any) {
    var gesture = this.getGesture(frame);
    if (!gesture) {
      this.currGesture = "";
      return null;
    }
    var foundGesture = null;
    switch (gesture.type) {
      case 'swipe':
        foundGesture = this.swipeHander(gesture);
        break;
      case 'circle':
        foundGesture = this.circleHander(frame, gesture);
        break;
      default:
        // you can add more basic gestures here
        return null;
    }
    this.gestureRecognized = this.GesturesStr[foundGesture];
    return this.checkAndReturnGesture(foundGesture);
  }

  /*****************************/
  // implemented in different function than the rest of gestures, because it is not regarded as gesture for leap
  private findPinch(frame:any) {
    if (frame.data.hands[0].pinchStrength === 1) { //depends on the accuracy you want. Max and more accurate is 1!
      this.gestureRecognized = this.GesturesStr[Gestures.PINCH];
    }

  }
  /*****************************/

  private checkAndReturnGesture(foundGesture:any) {
    if (this.gestureCounter == -1)
      return;

    if (this.currGesture == foundGesture) {
      this.gestureCounter++
    } else {
      this.currGesture = foundGesture;
      this.gestureCounter = 0;
    }

    if (this.gestureCounter == this.framesForGesture) {
      this.resetGestures();
      return foundGesture;
    }

    return null;
  }

  /*****************************/

  private resetGestures() {
    this.currGesture = null as any;
    this.gestureCounter = -1;

    setTimeout(() => {
      this.gestureCounter = 0;
    }, this.timeoutAfterRecognition);
  }

  /*****************************/

  private getGesture(frame:any) {
    if (!frame.valid || frame.data.gestures.length == 0)
      return null;

    var gestures = frame.data.gestures;

    var gesture = gestures[0];
    if (!gesture)
      return null;
    return gesture;
  }

  /*****************************/

  private swipeHander(gesture:any): Gestures {

    if (Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1])) { // swipe gestures recognize hand direction
      if (gesture.direction[0] > 0)
        return Gestures.SWIPE_RIGHT;
      return Gestures.SWIPE_LEFT;
    }
    if (gesture.direction[1] > 0)
      return Gestures.SWIPE_UP;
    return Gestures.SWIPE_DOWN;

  }

  /*****************************/

  private circleHander(frame:any, gesture:any): Gestures {
    if (!gesture || !gesture.pointableIds)
      return null as any;
    var pointableID = gesture.pointableIds[0]; // circle gestures recognize finger movement
    var direction = frame.pointable(pointableID).direction;
    var dotProduct = (Leap as any).vec3.dot(direction, gesture.normal);

    if (dotProduct > 0)
      return Gestures.CIRCLE_CLOCKWISE;
    return Gestures.CIRCLE_COUNTERCLOCKWISE;
  }

  /*****************************/

  //#region Initializing

  private initializeEmmiters() {
    this.positionEvent = new EventEmitter<CursorPos>();
    this.gestureEvent = new EventEmitter<Gestures>();
  }

  //#endregion

  /*****************************/

}
