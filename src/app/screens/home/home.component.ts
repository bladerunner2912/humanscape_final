import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../services/contentful/contentful.service';
import { NgFor } from '@angular/common';
import { IImages } from '../../interfaces/image';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [NgFor],
})
export class HomeComponent implements OnInit {
  s: any | undefined;
  images: Array<IImages> = [];
  pageRows: Array<string> = [];
  constructor(private contentful: ContentfulService) {}
  temp: any | undefined;
  ngOnInit(): void {
    this.contentful.client.getEntry('77y3U0SHa4F2DrEYJPJFeW').then((res) => {
      this.s = res;
      // console.log(this.s.fields.headPara.content[0].content[0].value);
      this.head = this.s.fields.headPara.content[0].content[0].value; // console.log(this.s.fields.subPara);
      this.sub = this.s.fields.subPara.content[0].content[0].value;
      this.subHyperLink = this.s.fields.subPara.content[0].content[1].data.uri;
      this.primaryImage = this.s.fields.primaryImage.fields.file.url;
      // console.log(this.s.fields.pageRows[0].fields.assets.length);
      // console.log(this.s.fields.pageRows[0].fields.assets[0]);
      // console.log(this.s.fields.pageRows[0].fields.assets[1]);
      // console.log(this.s.fields.homePageImages[0].fields.file.url);
      var i = this.s.fields.imagesWithProjectReference.length;
      for (var j = 0; j < i; j++) {
        var temp: IImages = {
          url: this.s.fields.imagesWithProjectReference[j].fields.image.fields
            .file.url,
          projectId:
            this.s.fields.imagesWithProjectReference[j].fields
              .relatedProjectTitle.sys.id,
          imageName:
            this.s.fields.imagesWithProjectReference[j].fields.imageName,
        };
        console.log(temp);
        this.images.push(temp);
      }
      // console.log('Checking the hyperlinked underline text\n\n\n');
      // this.sub = this.s.fields.headPara.content[0].content[0].value; // console.log(this.s.fields.subPara);
      // console.log(this.s.fields.primaryImage);
      // console.log(this.s.fields.pageRows);
    });
  }

  head =
    ' are an international practice rooted in India engaging in collaborative design processes to create spaces and objects of all scales that deeply impact human interactions and the shared environment.';
  sub =
    '2023-05-16 We are proud to share that our first house, Villa Uma, is featured on the May/June 2023 issue of Architectural Digest, India. It has been our honor and privilege to work with the entire Poddar family. We appreciate their faith in our vision as well as trust in our abilities. Thank you to the team at AD India both past and present, for all your efforts in helping us share our work with the world. And a big thank you to all of the amazing collaborators, builders, artisans, and contributors to this little home. Check out the complete article.';
  primaryImage = '';
  subHyperLink = 'www.archdigest.in';
}
