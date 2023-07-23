import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {map,catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class MediaItemService{
    

    constructor(private http: HttpClient){}

      get(medium){
        const getOptions = {
          params: {medium}
        };
        return this.http.get<MediaItemResponse>('mediaitems', getOptions)
        .pipe(map(response => {
          return response.mediaItems
        }),
        catchError(this.handleError)
        );
      }

      add(mediaItem){
        return this.http.post('mediaitems', mediaItem)
        .pipe(catchError(this.handleError));
      }

      delete(mediaItem){
        return this.http.delete(`mediaitems/${mediaItem.id}`)
        .pipe(catchError(this.handleError));
      }

      private handleError(error: HttpErrorResponse){
      console.log(error.message);
      return throwError('A data error occurred, please try again');
      }
}

export interface MediaItem {
  id: number;
  name: string;
  medium: string;
  category: string;
  year: string;
  watchedOn: number;
  isFavorite: boolean;
}

interface MediaItemResponse {
  mediaItems: MediaItem[];
}