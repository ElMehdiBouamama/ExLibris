import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ICatalogItem } from '../shared/models/catalogItem.model';
import configs from './configs/config.json';
import { Editor } from './models/editor';

@Injectable()
export class EditorService {
    private _item: ICatalogItem;
    private _editor: Editor;

    constructor(private http: HttpClient, private router: Router) { }

    public getEditor(): Editor {
        if (!this._editor) {
            this._editor = new Editor();
        }
        return this._editor;
    }

    public getItem(): ICatalogItem {
        if (!this._item) this._item = this.router.getCurrentNavigation().extras.state as ICatalogItem;
        return this._item;
    }

    public getFonts(name: string = ''): Observable<any[]> {
        const options = { params: new HttpParams().set('key', configs.google_font_API_Key) };
        return this.http.get(configs.google_font_API_URL, options).pipe(map((v: any) => v.items));
    }
}
