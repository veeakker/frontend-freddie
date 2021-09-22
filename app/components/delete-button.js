import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class DeleteButtonComponent extends Component {
  @service store;

  @action
  async clicked(item) {
    item.destroyRecord();
  }
}
