import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/model/sections';
import { TagExampleComponent } from '../../components/examples/tag/tag-example/tag-example.component';
import { TagApiComponent } from '../../components/examples/tag/tag-api/tag-api.component';
import { TagThemeComponent } from '../../components/examples/tag/tag-theme/tag-theme.component';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  headingMargin = {
    bottom: 'medium'
  }

  sections: Array<Section>;
  tagImg: string;

  constructor(){
    this.sections = new Array<Section>();
    this.tagImg = './assets/img/ready.svg';
  }

   ngOnInit() { 
    this.sections.push( 
      {id:0, label: 'API',selector: 'tag-api', component: TagApiComponent},
      {id:1, label: 'THEMING', selector: 'tag-theme', component: TagThemeComponent},
      {id:2, label: 'EXAMPLES', selector: 'examples-component-tag', component: TagExampleComponent}
    );
  }

}
