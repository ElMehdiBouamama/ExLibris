import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

    @Output('menuToggled') menuToggled: EventEmitter<void>;
    search = new FormControl('', [Validators.nullValidator]);
    categories = new FormControl('');
    searching = false;
    searchFailed = false;
    searchEnabled = false;

    constructor(private router: Router) {
        this.menuToggled = new EventEmitter();
    }

    ngOnInit(): void {
    }

    toggleMenu(): void {
        this.menuToggled.emit();
    }

    goToHome(): void {
        this.router.navigate(["/"]);
    }

    productSearch: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => (this.searching = true)),
            switchMap((term) =>
                of([])
            ),
            tap(() => (this.searching = false)),
        );
}
