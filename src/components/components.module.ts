import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { RatingComponent } from './rating/rating';
@NgModule({
	declarations: [ProgressBarComponent,
    RatingComponent],
	imports: [],
	exports: [ProgressBarComponent,
    RatingComponent]
})
export class ComponentsModule {}
