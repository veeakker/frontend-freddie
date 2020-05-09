import Model, { attr } from '@ember-data/model';

export default class FileModel extends Model {
  @attr() filename;

  get downloadUrl(){
    if( this.id )
      return `/files/${this.id}/download`;
    return undefined;
  }
}
