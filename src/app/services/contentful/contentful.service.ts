import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  client = createClient({
    accessToken: 'I63rkeBikN6FScv9XxcXuzn474i3T-A9Y8Iae3-DK6g',
    space: 'rct9f1gevyhv',
  });
  constructor() {}
  getEntry(id: string) {
    this.client.getEntry(id).then((res) => console.log(res));
  }
}
