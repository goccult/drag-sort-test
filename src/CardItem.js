import React from 'react';
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import './CardItem.less'

let dragingIndex = '-1'
let opacity = '1'

// 被拖拽的卡片
const CardSource = {
  // 卡片开始被拖拽时触发
  beginDrag(props) {
    dragingIndex = props.value
    return {
      index: props.index,
    }
  },
  // 卡片结束拖拽时触发
  endDrag(props) {
    dragingIndex = '-1'
    opacity = '1'
    props.newRenderFn() 
  },
}

// 目标卡片
const CardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if(dragIndex === hoverIndex) return null
    const hoverBoundingRect = (findDOMNode(component)).getBoundingClientRect()
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientX = (clientOffset).x - hoverBoundingRect.left // 悬浮时鼠标距离目标源的左边距

    if(hoverIndex - dragIndex === 1 && hoverClientX < hoverMiddleX) {
      return null
    }
    if(dragIndex - hoverIndex === 1 && hoverClientX > hoverMiddleX) {
      return null
    }

    props.moveSort(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  },
}

class CardItem extends React.Component {

  render() {
    const {connectDragSource, connectDropTarget, value} = this.props
    opacity = value === dragingIndex  ? '0.1' : '1'
    return (
      connectDragSource(connectDropTarget(
        <div className="CardItem" style={{opacity}}>
          {this.props.value}
        </div>
      ))
    );
  }
}

export default DragSource('card', CardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(
  DropTarget('card', CardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }))(CardItem),
)