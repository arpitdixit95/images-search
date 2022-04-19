export const DEFAULT_COLLECTION_ID = 2423569;
export const PER_PAGE = 30;
export const defaultFilters = [{
  category: 'orientation',
  categoryLabel: 'ORIENTATION',
  items: [{
    id: 'landscape', label: 'Landscape'
  }, {
    id: 'portrait', label: 'Portrait'
  }, {
    id: 'squarish', label: 'Square'
  }],
}];

export const searchModeFilters = [{
  category: 'order_by',
  categoryLabel: 'SORT BY',
  items: [{id: 'relevant', label: 'Relevance'}, {id: 'latest', label: 'Newest'}],
},{
  category: 'color',
  categoryLabel: 'COLOUR',
  items: [{
    id: 'black_and_white', label: 'Black & White'
  }, {
    id: 'black', label: 'Black'
  },{
    id: 'white', label: 'White'
  },{
    id: 'yellow', label: 'Yellow'
  }, {
    id: 'orange', label: 'Orange'
  },{
    id: 'red', label: 'Red'
  },{
    id: 'purple', label: 'Purple'
  },{
    id: 'magenta', label: 'Magenta'
  },{
    id: 'green', label: 'Green'
  },{
    id: 'teal', label: 'Teal'
  },{
    id: 'blue', label: 'Blue'
  }],
},{
  category: 'orientation',
  categoryLabel: 'ORIENTATION',
  items: [{
    id: 'landscape', label: 'Landscape'
  }, {
    id: 'portrait', label: 'Portrait'
  }, {
    id: 'squarish', label: 'Square'
  }],
},]