import CardItem from './CardItem'
import HTML5Backend from 'react-dnd-html5-backend'
import React from 'react';
import { DndProvider } from 'react-dnd'
import './CardTable.less';

class CardTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardList: [],
      newRender: false,
    }
  }

  // 初始化数据
  componentDidMount = () => {
    let cardList = []
    for(let i = 0; i < 32; i++) {
      cardList.push(i)
    }
    this.setState({
      cardList,
    })
  }

  // 卡片重新排序
  moveSort = (dragIndex, hoverIndex) => {
    const cardList = this.state.cardList
    const tmp = cardList[dragIndex]
    cardList.splice(dragIndex, 1)
    cardList.splice(hoverIndex, 0, tmp)
    this.setState({
      cardList,
    })
  }

  // 卡片重新render
  newRenderFn = () => {
    this.setState({
      newRender: !this.state.newRender,
    })
  }

  render() {
    return (
      // 使用dndprovider包裹可被拖拽的卡片
      <DndProvider backend={HTML5Backend}>
        <div className="CardTable">
          {
            this.state.cardList.map((value, index) => {
              return <CardItem 
                key={index} 
                index={index} 
                value={value}
                newRender={this.state.newRender}
                moveSort={this.moveSort}
                newRenderFn={this.newRenderFn}
              />
            })
          }
        </div>
      </DndProvider>
    );
  }
}

export default CardTable;
