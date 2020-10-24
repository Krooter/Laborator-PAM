import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, SearchType } from 'src/app/services/http.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  results: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  searchChanged() {
    this.results = this.httpService.searchData(this.searchTerm, this.type);
  }
}
