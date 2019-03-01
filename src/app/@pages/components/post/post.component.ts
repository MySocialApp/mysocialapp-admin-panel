import {Component, ContentChild, TemplateRef, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'pgpost',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './post.component.html',
})
export class pgPost {
    @ContentChild('PostTitle') PostTitle: TemplateRef<void>;

}
