import { Component, OnInit } from '@angular/core';
import { IImages } from '../../interfaces/image';
import { ContentfulService } from '../../services/contentful/contentful.service';
import { ImageServiceService } from '../../services/imageService/image-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [NgFor],
  templateUrl: './study.component.html',
  styleUrl: './study.component.css',
})
export class StudyComponent implements OnInit {
  id!: string | null;
  firstHeading = '';
  secondHeading = '';
  headingParagraph = '';
  subParagraph = '';
  subParagraphLink = '';
  primaryImage = '';
  images: Array<IImages> = [];
  temp: any;

  constructor(
    private route: ActivatedRoute,
    private contentful: ContentfulService,
    private imageService: ImageServiceService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.contentful.client.getEntry(this.id!).then((res) => {
      this.temp = res.fields;
      console.log(this.temp);
      this.firstHeading = this.temp.firstHeading;
      this.secondHeading = this.temp.secondHeading;
      this.headingParagraph = this.temp.headingParagraph;
      this.subParagraph = this.temp.subParagraph;
      this.primaryImage = this.temp.studyPrimaryImage.fields.file.url;
      this.subParagraphLink = this.temp.subParagraphLink;
      var s = this.temp.projectImages.length;
      for (var i = 0; i < s; i++) {
        this.images.push(
          this.imageService.factoryIImage(this.temp.projectImages[i].fields)
        );
      }
      console.log(this.images);
    });
  }
}
