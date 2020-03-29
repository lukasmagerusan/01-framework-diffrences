import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  search(searchTerm) {
    return this.http.get(`https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&client_id=84sHIaQrR9rSmxJKVr4c1O2orNTm00OeANCnpZ-Yta0`)
  }
}
