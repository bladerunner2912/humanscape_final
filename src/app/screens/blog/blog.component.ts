import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentfulService } from '../../services/contentful/contentful.service';
import { ImageServiceService } from '../../services/imageService/image-service.service';
import { BlogRow } from '../../interfaces/blog-row';
import { NgFor, NgIf, NgIfContext } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  id!: string | null;
  firstHeading = '';
  secondHeading = '';
  headingParagraph = '';
  subParagraph = '';
  subParagraphLink = '';
  primaryImage = '';
  rows: Array<BlogRow> = [];
  temp: any;
  elseBlock: any;
  constructor(
    private route: ActivatedRoute,
    private contentful: ContentfulService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.contentful.client.getEntry(this.id!).then((res) => {
      this.temp = res.fields;
      this.firstHeading = this.temp.firstHeading;
      this.secondHeading = this.temp.secondHeading;
      this.headingParagraph = this.temp.headingParagraph;
      this.subParagraph = this.temp.subParagraph;
      this.subParagraphLink = this.temp.subParagraphLink;
      this.primaryImage = this.temp.studyPrimaryImage.fields.file.url;
      var s = this.temp.blogContent.length;
      for (var i = 0; i < s; i++) {
        console.log(this.temp.blogContent[i].fields);
        if (this.temp.blogContent[i].fields.leftParagraph) {
          console.log('here');
        }
        if (this.temp.blogContent[i].fields.leftParagraph) {
          var j: BlogRow = {
            image: this.temp.blogContent[i].fields.rightImage.fields.file.url,
            para: this.temp.blogContent[i].fields.leftParagraph,
            para2: '',
          };
          this.rows.push(j);
        } else {
          var j: BlogRow = {
            image:
              this.temp.blogContent[i].fields.rightSingleImage.fields.file.url,
            para: this.temp.blogContent[i].fields.firstParagraph,
            para2: this.temp.blogContent[i].fields.secondParagraph,
          };
          this.rows.push(j);
        }
        console.log(this.rows);
        // if(this.temp.blogContent[i])
      }
      // this.primaryImage = this.temp.primaryImage.fields.
    });
  }
}
