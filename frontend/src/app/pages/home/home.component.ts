import { Component, OnInit } from '@angular/core';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private smartSpeaker: SmartSpeakerService) { }

    ngOnInit() {
        this.smartSpeaker.speak("Hello world!", () => {
            console.log("speech ended")
        });
        this.smartSpeaker.addCommand(["hello", "hi"], () => {
            this.smartSpeaker.speak("is it me you're looking for?");
        });
        this.smartSpeaker.addCommand("Go to tasks", () => {
            this.smartSpeaker.speak("Going to tasks", () => {
                window.location.href = "/tasks";
            });
        });
        this.smartSpeaker.addCommand("Do something", () => {
            this.smartSpeaker.speak("Dont tell me what to do");
        });
        this.smartSpeaker.initialize(); 

        this.smartSpeaker.start();

    }

}
