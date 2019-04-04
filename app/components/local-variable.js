import { computed } from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class LocalVariableComponent extends Component {
  @tracked localVariable
  @tracked didSetLocalVariable

  @computed( 'didSetLocalVariable', 'localVariable', 'attrs.default' )
  get value(){
    if( this.didSetLocalVariable )
      return this.localVariable;
    else
      return this.attrs && this.attrs.default;
  }

  @action
  update(newValue){
    this.didSetLocalVariable = true;
    this.localVariable = newValue;
  }
  @action
  toggle(){
    this.update( !this.localVariable );
  }
}
