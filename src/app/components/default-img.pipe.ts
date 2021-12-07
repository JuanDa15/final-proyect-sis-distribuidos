import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImg'
})
export class DefaultImgPipe implements PipeTransform {

  transform(path: string): string {
    let defaultImg:string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Icon-round-Question_mark.jpg/1200px-Icon-round-Question_mark.jpg';
    return (path.length !== 0)? path:defaultImg;
  }

}
