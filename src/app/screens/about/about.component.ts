import { Component, OnDestroy, OnInit } from '@angular/core';
import { Url } from 'url';
import { IImages } from '../../interfaces/image';
import { ContentfulService } from '../../services/contentful/contentful.service';
import { NgFor } from '@angular/common';
import { CarouselModule } from '@coreui/angular';
import { Subscription, interval } from 'rxjs';
import { IPeople } from '../../interfaces/people';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, CarouselModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit, OnDestroy {
  primaryImage = '';
  leftParagraphOne = '';
  rightParagraphOne = '';
  leftParagraphTwo = '';
  temp: any;
  people: Array<IPeople> = [];
  carouselImages: Array<string> = [];
  selectedUrl: string = '';
  images: Array<string> = [];
  private subscription: Subscription = new Subscription();
  constructor(private contentful: ContentfulService) {}
  ngOnInit(): void {
    this.contentful.client.getEntry('6qmh3H5chP7e0yTyg4DLmN').then((res) => {
      // ! about page loader
      this.temp = res.fields;
      this.primaryImage = this.temp.aboutPrimaryImage.fields.file.url;
      this.leftParagraphOne = this.temp.leftParagraphOne;
      this.leftParagraphTwo = this.temp.leftParagraphTwo;
      this.rightParagraphOne = this.temp.rightParagraphOne;
      // console.log(this.temp.carouselImages[0].fields.file);
      // ? loading the carouselImages url.
      var s = this.temp.carouselImages.length;
      for (var i = 0; i < s; i++) {
        // console.log(this.temp.carouselImages[i].fields.file.url);
        this.carouselImages.push(this.temp.carouselImages[i].fields.file.url);
      }

      // console.log(this.carouselImages);
      // ! the selectedUrl first image is set as carouselImages in filled.
      this.selectedUrl = this.carouselImages[0];

      // ? loading the images url.
      s = this.temp.images.length;
      for (i = 0; i < s; i++) {
        this.images.push(this.temp.images[i].fields.file.url);
      }

      // ! people loader
      this.contentful.client
        .getEntries({ content_type: 'people', include: 5 })
        .then((res) => {
          this.temp = res;
          // console.log(this.temp.items[0].fields.employeePic.fields.file.url);
          var s = this.temp.items.length;
          console.log(s);
          for (var i = 0; i < s; i++) {
            var people: IPeople = {
              name: this.temp.items[i].fields.employeeName,
              img: this.temp.items[i].fields.employeePic.fields.file.url,
              bio: this.temp.items[i].fields.bio,
              role: this.temp.items[i].fields.jobTitle,
            };
            this.people.push(people);
          }
          console.log(this.people);
        });
      // ! carousel switcher.
      this.subscription = interval(5000).subscribe(() => {
        this.changeURL();
      });
    });
  }

  ngOnDestroy(): void {
    // ! carousel destroyer.
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // ! carousel function
  changeURL(): void {
    const currentIndex = this.carouselImages.indexOf(this.selectedUrl);
    const nextIndex = (currentIndex + 1) % this.carouselImages.length;
    this.selectedUrl = this.carouselImages[nextIndex];
  }
}
