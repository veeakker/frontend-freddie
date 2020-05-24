import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ProductsInputFormComponent extends Component {
  @service store

  get labelArray() {
    const enabled = (this.args.product.productLabels || []);
    return [{ uri: "http://veeakker.be/product-labels/d9fa5ad6-0d0e-4990-b8a7-ca3a60eb3a85",
        label: "Frozen",
        image: "/images/product-labels/diepvries.png",
        selected: enabled.includes( "http://veeakker.be/product-labels/d9fa5ad6-0d0e-4990-b8a7-ca3a60eb3a85")
      },
      { uri: "http://veeakker.be/product-labels/fa0d5d40-762e-4f89-ac82-46c1a4ee00bf",
        label: "Natuurpunt",
        image: "/images/product-labels/natuurpunt.png",
        selected: enabled.includes( "http://veeakker.be/product-labels/fa0d5d40-762e-4f89-ac82-46c1a4ee00bf")
      },
      { uri: "http://veeakker.be/product-labels/c9e43e38-3f7f-4116-9817-80bdede3f123",
        label: "PintaFish",
        image: "/images/product-labels/pintafish.png",
        selected: enabled.includes( "http://veeakker.be/product-labels/c9e43e38-3f7f-4116-9817-80bdede3f123")
      }];
  }

  @action
  setLabel(label, value) {
    const currentLabels = this.args.product.productLabels || [];
    if( value ) {
      this.args.product.set(
        "productLabels",
        [ label.uri, ...currentLabels ] );
    } else {
      this.args.product.set(
        "productLabels",
        [ ...currentLabels.filter( (x) => x !== label.uri ) ] );
    }
  }

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
