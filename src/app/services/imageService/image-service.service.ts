import { Injectable } from '@angular/core';
import { IImages } from '../../interfaces/image';

@Injectable({
  providedIn: 'root',
})
export class ImageServiceService {
  constructor() {}
  factoryIImage(res: any) {
    var s: IImages = {
      url: res.image.fields.file.url,
      projectId: res.relatedProjectTitle.sys.id,
      imageName: res.imageName,
      type: res.type,
    };
    return s;
  }
}
