import Component from '@glimmer/component';

export default class CommonUnitSelectionComponent extends Component {
  units = Object.freeze({
    "GRM": "gram",
    "KGM": "kilogram",
    "C62": "piece"
  });

  unitArray = Object.freeze([
    "GRM", "KGM", "C62"
  ]);
}
