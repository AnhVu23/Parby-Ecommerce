import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { RatingComponent } from './rating/rating';
import { RatingShowComponent } from './rating-show/rating-show';
@NgModule({
	declarations: [ProgressBarComponent,
    RatingComponent,
    RatingShowComponent],
	imports: [],
	exports: [ProgressBarComponent,
    RatingComponent,
    RatingShowComponent]
})
export class ComponentsModule {}
