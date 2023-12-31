import { Component, OnInit } from '@angular/core';
import { IImages } from '../../interfaces/image';
import { ContentfulService } from '../../services/contentful/contentful.service';
import { ImageServiceService } from '../../services/imageService/image-service.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-initiative',
  standalone: true,
  imports: [NgFor],
  templateUrl: './initiative.component.html',
  styleUrl: './initiative.component.css',
})
export class InitiativeComponent implements OnInit {
  temp: any;
  images: Array<IImages> = [];
  constructor(
    private router: Router,
    private content: ContentfulService,
    private image: ImageServiceService
  ) {}
  ngOnInit(): void {
    this.content.client.getEntry('3Kp6zeqJaiL1BlgdreNnrx').then((res) => {
      this.temp = res.fields;
      console.log(this.temp.images[0].fields);
      for (var i = 0; i < this.temp.images.length; i++) {
        this.images.push(this.image.factoryIImage(this.temp.images[i].fields));
      }
      console.log(this.images);
    });
  }
  openPage(id: string, type: string) {
    console.log(id);
    this.router.navigate([type, { id: id }]);
  }
}
