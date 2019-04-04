import { computed } from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class LocalVariableComponent extends Component {
  @tracked localVariable
  @tracked didSetLocalVariable

  @computed( 'didSetLocalVariable', 'localVariable', 'args.default' )
  get value(){
    console.log(`Default for value is ${this.args.default}`);
    if( this.didSetLocalVariable )
      return this.localVariable;
    else
      return this.args.default;
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
