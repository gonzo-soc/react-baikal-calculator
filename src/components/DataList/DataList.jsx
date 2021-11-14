import React, { Component } from 'react';

import "./DataList.scss";

export default class DataList extends Component {
  constructor(props) {
    super(props);
    const { label, dictItemList, selectedItem, attributeChangeDispatcher } = props;
    this.state = {
      label: label,
      dictItemList: dictItemList,
      selectedItem: selectedItem,
      showItemList: [],

      isEditing: false,
      isOpened: false,

      attributeChangeDispatcher: attributeChangeDispatcher,
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onItemClickHandler = this.onItemClickHandler.bind(this);
    this.onArrowClickHandler = this.onArrowClickHandler.bind(this);
  }

  onChangeHandler(event) {
    const dummySelected = {
      id: -1,
      title: '',
    }
    const itemFragment = event.target.value;

    if (itemFragment.length > 0) {
      const itemFragmentRegExp = new RegExp('^(' + itemFragment + '.*)$', 'gi');
      const newShowItemList = this.state.dictItemList.filter((item) => item['title'].match(itemFragmentRegExp) !== null);
      dummySelected['title'] = itemFragment;
      this.setState((prevState) => {
        return {
          label: prevState.label,
          dictItemList: prevState.dictItemList,
          selectedItem: dummySelected,
          showItemList: newShowItemList,
          isEditing: true,
          isOpened: prevState.isOpened,
        }
      });
    } else {
      this.setState((prevState) => {
        return {
          label: prevState.label,
          dictItemList: prevState.dictItemList,
          selectedItem: dummySelected,
          showItemList: [],
          isEditing: false,
          isOpened: prevState.isOpened,
        };
      })
    }
  }

  onItemClickHandler(event) {
    // event is capture on <li><span>...
    let newSelectedItemValue = event.target.innerHTML;
    
    // event is captured on <li>
    let newSelectedItem = event.target.querySelector('span.baikal_dl__content_list__item__text');
    if (newSelectedItem) {
      newSelectedItemValue = newSelectedItem.innerHTML;
    }

    const itemFragmentRegExp = new RegExp('^(' + newSelectedItemValue + '.*)$', 'gi');
    const newShowItemList = this.state.dictItemList.filter((item) => item['title'].match(itemFragmentRegExp) !== null);
    if (newShowItemList.length !== 0) {
      this.setState((prevState) => {
        return {
          label: prevState.label,
          dictItemList: prevState.dictItemList,
          selectedItem: newShowItemList[0],
          showItemList: [],
          isEditing: false,
          isOpened: false,
        }
      });
      this.state.attributeChangeDispatcher(newShowItemList[0]);
    }
    event.stopPropagation();
  }

  onArrowClickHandler() {
    const newShowItemList = this.state.dictItemList.slice(0, this.state.dictItemList.length);
    this.setState((prevState) => {
      return {
        label: prevState.label,
        dictItemList: prevState.dictItemList,
        selectedItem: prevState.selectedItem,
        showItemList: newShowItemList,
        isEditing: prevState.isEditing,
        isOpened: !prevState.isOpened,
      }
    })
  }

  getShowItemList() {
    const { showItemList, isOpened, isEditing } = this.state;
    const isClosig = (showItemList.length === 0 || (!isOpened && !isEditing));
    if (isClosig) {
      return null;
    } else {
      return (
        showItemList.map((item) => <li key={item['id'] + '_' + item['title']} className="baikal_dl__content_list__item" onClick={this.onItemClickHandler}><span className="baikal_dl__content_list__item__text">{item['title']}</span></li>)
      );
    }
  }

  render() {
    let inputInnerWrapperStyleClass = "baikal_dl__input_wrapper__input_inner_wrapper";
    if (this.state.isOpened) {
      inputInnerWrapperStyleClass += " is_open";
    }

    if (this.state.isEditing) {
      inputInnerWrapperStyleClass += " is_edit";
    }

    let inputLabelStyleClass = "baikal_dl__label";
    if (this.state.isEditing || this.state.isOpened) {
      inputLabelStyleClass += " baikal_dl__label__active";
    }

    return (
      <div className="baikal_dl">
        <label htmlFor={`baikal_dl__input__${this.state.label}`} className={inputLabelStyleClass}>{this.state.label}</label>
        <div className="baikal_dl__input_wrapper">
          <div className={inputInnerWrapperStyleClass}>
            <input name={`baikal_dl__input__${this.state.label}`} className="baikal_dl__input_wrapper__input_inner_wrapper__input" type="text" onChange={this.onChangeHandler} value={this.state.selectedItem['title']} />
          </div>
          <div className="baikal_dl__input_wrapper__arow_placeholder" onClick={this.onArrowClickHandler}></div>
          <div className="baikal_dl__input_wrapper__border"></div>
        </div>
        <ul className="baikal_dl__content_list">
          {this.getShowItemList()}
        </ul>
      </div>
    );
  }
}