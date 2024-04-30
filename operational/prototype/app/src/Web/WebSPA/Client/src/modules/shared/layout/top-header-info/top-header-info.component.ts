import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-top-header-info',
    templateUrl: './top-header-info.component.html',
    styleUrls: ['./top-header-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopHeaderInfoComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
