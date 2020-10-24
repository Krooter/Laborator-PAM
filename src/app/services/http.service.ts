import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  url= 'http://www.omdbapi.com'
  apiKey='ad34ea22'

  constructor(private http: HttpClient) { 
  }

  searchData(title: string, type: SearchType): Observable<any>{
      return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
        map(result => result['Search'])
      )
  }

  getDetails(id: any){
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }

}
