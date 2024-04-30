import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
    @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;
    sliderValue: number;
    isAnimationDisabled: boolean = true;

    ngAfterViewInit() {
        setTimeout(() => {
            this.isAnimationDisabled = false;
        })
    }

    constructor(private router: Router) {
        this.sliderValue = 0;
    }

    ngOnInit(): void {
    }

    goToShop(): void {
        this.router.navigate(["/catalog"]);
    }

    moveLeft() {
        this.ds.moveLeft();
        this.sliderValue = 0;
    }

    moveRight() {
        this.ds.moveRight();
        this.sliderValue = 1;
    }

    indexChanged(index: number) {
        this.sliderValue = index;
        this.ds.moveTo(this.sliderValue);
    }
}
