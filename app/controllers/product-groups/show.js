import Controller from '@ember/controller';
import fade from 'ember-animated/transitions/fade';
import crossFadeTransition from 'frontend-freddie/utils/transitions/cross-fade';

export default class ProductGroupsShowController extends Controller {
  crossFade = crossFadeTransition
  transition = fade;
}
