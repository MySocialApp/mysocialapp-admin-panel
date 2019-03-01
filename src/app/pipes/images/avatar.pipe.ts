import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'avatar'})
export class AvatarPipe implements PipeTransform {

    transform(imageSrc: any): string {
        if (imageSrc && imageSrc['displayed_photo'] !== undefined && imageSrc['displayed_photo'].small_url !== undefined) {
            return imageSrc['displayed_photo'].small_url;
        }
        return '/assets/default-avatar.jpg';
    }

}
