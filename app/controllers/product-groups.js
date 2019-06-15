import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Controller from '@ember/controller';

import { wait } from 'ember-animated';
import { fadeIn } from 'ember-animated/motions/opacity';
import move from 'ember-animated/motions/move';
import fade from 'ember-animated/transitions/fade';

export default class ProductGroupsController extends Controller {
  /* -- Sorting -- */
  @tracked sortProperty = 'sortIndex'
  @tracked sortProperties = ['sortIndex', 'label']

  get sortedProductGroups() {
    return this.get('model').sortBy(this.sortProperty);
  }

  @action
  updateSort( newProperty ){
    this.sortProperty = newProperty;
  }

  /* -- Editing -- */
  @tracked
  editing = false

  @action
  toggleEditing() {
    this.editing = ! this.editing;
  }

  transition = fade;
}
