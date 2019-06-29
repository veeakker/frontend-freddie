import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ProductsInputFormComponent extends Component {
  @service store
  
  @action
  submit(event){
    event.preventDefault();

    this.args.submit();
  }

  @action
  async uploadThumbnail(file){
    const result = await file.upload("/files");
    this.store.pushPayload('file', result.body);
    const uploadedFile = this.store.peekRecord( 'file', result.body.data.id );
    const product = this.args.product;
    set( product, "thumbnail", uploadedFile );
    set( product, "hasDirtyRelationships", true );
  }
}
