import Route from '@ember/routing/route';

export default class ProductGroupsShowRoute extends Route {
  async model( {product_group_id} ){
    const data = await this.store.query(
      'product-group',
      {"filter[:id:]": product_group_id,
       "page[size]": 250,
       "include": "products" }
    );

    return data.firstObject;
  }
}
