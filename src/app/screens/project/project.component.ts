import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentfulService } from '../../services/contentful/contentful.service';
import { IProject } from '../../interfaces/project';
import { Observable, switchMap } from 'rxjs';
import { IImages } from '../../interfaces/image';
import { ImageServiceService } from '../../services/imageService/image-service.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  id!: string | null;
  temp: any;
  projectImages: Array<IImages> = [];
  project: IProject | undefined;
  constructor(
    private imageHandler: ImageServiceService,
    private route: ActivatedRoute,
    private contentful: ContentfulService
  ) {}
  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.id = this.route.snapshot.paramMap.get('id');
    this.contentful.client.getEntry(this.id!).then((res) => {
      // console.log(res);
      this.temp = res.fields;
      console.log(this.temp);
      var s = this.temp.images.length;
      for (var i = 0; i < s; i++) {
        this.projectImages.push(
          this.imageHandler.factoryIImage(this.temp.images[i].fields)
        );
      }
      console.log(this.temp.website.content[0]);
      var project: IProject = {
        name: this.temp.name,
        title: this.temp.title,
        place: this.temp.place,
        loc: this.temp.loc,
        primaryImage: this.temp.primaryImage.fields.file.url,
        secondaryImage: this.temp.secondaryImage.fields.file.url,
        tagLine: this.temp.tagLine,
        tagBio: this.temp.tagBio,
        website: this.temp.website.content[0].content[0].value,
        completed: this.temp.completed,
        artist: this.temp.artistJsonField,
        images: this.projectImages,
        id: this.id!.toString(),
        bio: this.temp.bio,
      };
      this.project = project;
      console.log(this.project);
      // console.log(this.temp.images);
      // console.log(this.temp.primaryImage);
      // console.log(this.temp.name);
    });
  }
}
