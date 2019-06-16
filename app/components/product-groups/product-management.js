import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';
import crossFade from 'frontend-freddie/utils/transitions/cross-fade';
import { crossFadeAndMatch } from 'frontend-freddie/utils/transitions/cross-fade';


export default class ProductGroupsProductManagementComponent extends Component {
  state = "init"
  crossFadeAndMatch = crossFadeAndMatch

  transition=fade
  
}
