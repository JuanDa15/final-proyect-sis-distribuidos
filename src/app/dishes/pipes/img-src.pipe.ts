import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'imgSrc',
  pure:true
})
export class ImgSrcPipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){}

  transform(url:string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
