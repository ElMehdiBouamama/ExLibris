import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-rating-choice',
    templateUrl: './rating-choice.component.html',
    styleUrls: ['./rating-choice.component.scss']
})
export class RatingChoiceComponent implements OnInit {
    @Input("readonly") isReadOnly: boolean;
    @Input("max") max: number;
    @Input("rate") rate: number;
    @Input("nbratings") nbRatings: number;

    constructor() {

    }

    ngOnInit() {
    }
}
