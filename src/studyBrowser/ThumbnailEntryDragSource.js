import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import ThumbnailEntry from './ThumbnailEntry.js';
import PropTypes from 'prop-types';

// Drag sources and drop targets only interact
// if they have the same string type.
const Types = {
  THUMBNAIL: 'thumbnail'
};

const thumbnailSource = {
  /*canDrag(props) {
    return props.error === false;
  },*/

  beginDrag(props) {
    return props;
  },

  endDrag(props, monitor) {
    //const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      //console.log(`You dropped ${item.id} into ${dropResult.id}!`);
      //console.log(item);
    }
  }
};

class ThumbnailEntryDragSource extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isDragging: false
  };

  render() {
    const { connectDragSource } = this.props;
    const dropEffect = 'copy';

    return connectDragSource(
      <div className="ThumbnailEntryContainer">
        <ThumbnailEntry {...this.props} />
      </div>,
      { dropEffect }
    );
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

export default DragSource(Types.THUMBNAIL, thumbnailSource, collect)(
  ThumbnailEntryDragSource
);
