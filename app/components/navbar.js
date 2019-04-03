import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class NavbarComponent extends Component {
  @tracked showMobileMenu = false;

  @action
  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }
}
