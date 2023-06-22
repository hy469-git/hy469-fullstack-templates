import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { LeapService } from 'src/app/global/services/leap/leap.service';
//@ts-ignores
import * as $ from 'jquery';

// declare var $: any; //remove comment if your Angular versions doesn't identify $ sign

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styleUrls: ['./virtual.component.scss']
})
export class VirtualComponent implements OnInit {

  /*****************************/

  @Input() elements2Check = ['btn1', 'btn2', 'btn3', 'btn4']; // elements you set to listen to click event. You can modify it to listen to html elemets as well (check ngOnInit)
  @Input() size = 40; // cursor diameter in px
  @Input() color = 'black';

  private canClick!: boolean;
  public clickEvents: string[] = [];
  private intervalBetweenClicks!: number;
  private clickX!:any;
  private clickY!:any;
  /*****************************/

  public cursorStyle!:any;
  public cursorSize!:any;

  public loading = {
    width: '0%'
  }

  /*****************************/

  private cursorCounter = 0;

  /*****************************/

  constructor(public leap: LeapService) {
  }

  /*****************************/

  ngOnInit() {
    this.initCursorLook();
    this.canClick = true; // can click at start
    this.intervalBetweenClicks = 2000; //ms ==> recognize pinch every 2 seconds
    // add click events to elements you previously chose to "track"
    this.elements2Check.forEach(element => {
      $('#' + element).click(
        () => { this.addClickEvent("clicked button: #" + element); }
      );
    })

    setInterval(() => {
      this.cursorCounter++;
      if (this.cursorCounter == 5) {
        this.cursorStyle.display = 'none';
      }
    }, 200);

    this.leap.cursorRecognizer().subscribe((leapPos) => {
      this.cursorStyle.left = leapPos.xPos + 'px';
      this.cursorStyle.top = leapPos.yPos + 'px';
      this.clickX = leapPos.xPos;
      this.clickY = leapPos.yPos;
      this.cursorStyle.display = 'block';

      this.cursorCounter = 0;

      if (this.canClick)
        this.checkPinch();
    });

  }

  /*****************************/

  addClickEvent(event: string) // used only to push and display click events in html
  {
    this.clickEvents.push(event);
  }

  /*****************************/

  private checkPinch() {
    if (this.canClick && this.leap.gestureRecognized === "PINCH") {
      this.pauseClicks();
      this.leap.gestureRecognized = ''
      let event = new MouseEvent('click');
      const el = document.elementFromPoint(this.clickX, this.clickY);
      (el as any).dispatchEvent(event);
    }
  }

  private pauseClicks() {
    this.canClick = false;
    setTimeout(() => {
      this.canClick = true;
    }, this.intervalBetweenClicks);
  }

  /*****************************/

  private initCursorLook() {
    this.cursorSize = {
      width: this.size + 'px',
      height: this.size + 'px',
      "background-color": this.color
    };

    this.cursorStyle = {
      top: '0px',
      left: '0px',
      display: 'none',
      width: this.size + 'px',
      height: this.size + 'px'
    };
  }

  /*****************************/

  /* START section: functions you may use if you try different implementation (not suggested) */

  /* Below functions can be used in case you want to implement different kind of click
   * e.g., hover 3secs and then click
   * If you try to do so..good luck :)
  */


  // remove comments in case you try using the following methods
  // private onItemCounter = 0;
  // private itemSelected;
  // @Input() waitingTime = 80;

  /*****************************/

  // private updateCursor() {
  //   this.loading.width = (this.onItemCounter / this.waitingTime * 100) + '%';

  //   if (this.onItemCounter == this.waitingTime) {
  //     let event = new MouseEvent('click');
  //     this.itemSelected.dispatchEvent(event);
  //     this.resetCursor();
  //   }
  // }

  /*****************************/

  // private resetCursor() {
  //   this.onItemCounter = 0;
  //   this.itemSelected = null;
  //   this.loading.width = '0%';
  // }

  /*****************************/

  /* END section: functions you may use if you try different implementation (not suggested) */
}
