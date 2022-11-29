import { Component, OnInit } from '@angular/core';
import { SmartSpeakerService } from '../../smart-speaker.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private smartSpeaker: SmartSpeakerService) { }

    ngOnInit() {
        this.smartSpeaker.addCommand("hello", () => {
            this.smartSpeaker.speak("Hello, how can I help you?");
        });
        this.smartSpeaker.addCommand("Go to tasks", () => {
            this.smartSpeaker.speak("Going to tasks");
            window.location.href = "/tasks";
        });
        this.smartSpeaker.addCommand("Do something", () => {
            console.log("Doing something");
            this.smartSpeaker.speak("Dont tell me what to do");
        });
        this.smartSpeaker.initialize();

        this.smartSpeaker.start();

    }

}
