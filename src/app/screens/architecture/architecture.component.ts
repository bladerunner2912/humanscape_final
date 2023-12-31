import { Component, OnInit } from '@angular/core';
import { IImages } from '../../interfaces/image';
import { NgFor } from '@angular/common';
import { ContentfulService } from '../../services/contentful/contentful.service';
import { ImageServiceService } from '../../services/imageService/image-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [NgFor],
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.css',
})
export class ArchitectureComponent implements OnInit {
  images: Array<IImages> = [];
  temp: any;

  constructor(
    private contentful: ContentfulService,
    private imageService: ImageServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.contentful.client.getEntry('294UVOL1g6ZFNz0GsrRolS').then((res) => {
      this.temp = res.fields;
      var s = this.temp.images.length;
      for (var i = 0; i < s; i++) {
        this.images.push(
          this.imageService.factoryIImage(this.temp.images[i].fields)
        );
        console.log(this.images);
      }
    });
  }
  openProject(id: string) {
    console.log(id);
    this.router.navigate(['project', { id: id }]);
  }
}
