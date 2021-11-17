import React, { Component } from 'react';

import "./DataList.scss";

export default class DataList extends Component {
  constructor(props) {
    super();
    const { selectedItem } = props;
    this.state = {
      selectedItem: selectedItem,
      showItemList: [],
      isEditing: false,
      isOpened: false,
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
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
      const newShowItemList = this.props.dictItemList.filter((item) => item['title'].match(itemFragmentRegExp) !== null);
      dummySelected['title'] = itemFragment;
      this.setState({
        selectedItem: dummySelected,
        showItemList: newShowItemList,
        isEditing: true,
      });
    } else {
      this.setState({
        selectedItem: dummySelected,
        showItemList: [... this.props.dictItemList],
        isEditing: true,
      });
    }
  }

  onBlurHandler(event) {
    const itemFragment = event.target.value;
    let newSelectedItem = this.props.dictItemList[0];
    if (itemFragment.length > 0) {
      const itemFragmentRegExp = new RegExp('^(' + itemFragment + '.*)$', 'gi');
      const filteredDictItemList = this.props.dictItemList.filter((item) => item['title'].match(itemFragmentRegExp) !== null);
      if (filteredDictItemList.length > 0) {
        newSelectedItem = filteredDictItemList[0];
      }
    }
    this.setState({
      selectedItem: newSelectedItem,
      showItemList: [],
      isEditing: false,
    })
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
    const newShowItemList = this.props.dictItemList.filter((item) => item['title'].match(itemFragmentRegExp) !== null);
    if (newShowItemList.length !== 0) {
      this.setState({
        selectedItem: newShowItemList[0],
        showItemList: [],
        isEditing: false,
        isOpened: false,
      });
      this.props.attributeChangeDispatcher(newShowItemList[0]);
    }
    event.stopPropagation();
  }

  onArrowClickHandler() {
    const newShowItemList = this.props.dictItemList.slice(0, this.props.dictItemList.length);
    this.setState((prevState) => {
      return {
        showItemList: newShowItemList,
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
    const { isOpened, isEditing} = this.state;
    const isValid = this.props.isValid;
    let inputWrapperStyleClass = 'baikal_dl__input_wrapper';
    if (!isValid) {
      inputWrapperStyleClass += ' is_baikal_invalid_input';
    }

    let inputInnerWrapperStyleClass = "baikal_dl__input_wrapper__input_inner_wrapper";
    if (isOpened) {
      inputInnerWrapperStyleClass += " is_open";
    }

    if (isEditing) {
      inputInnerWrapperStyleClass += " is_edit";
    }

    let inputLabelStyleClass = "baikal_dl__label";
    if (isEditing || isOpened) {
      inputLabelStyleClass += " baikal_dl__label__active";
    }
    if (!isValid) {
      inputLabelStyleClass += " is_baikal_invalid_label";
    }

    return (
      <div className="baikal_dl">
        <label htmlFor={`baikal_dl__input__${this.props.label}`} className={inputLabelStyleClass}>{this.props.label}</label>
        <div className={inputWrapperStyleClass}>
          <div className={inputInnerWrapperStyleClass}>
            <input name={`baikal_dl__input__${this.props.label}`} className="baikal_dl__input_wrapper__input_inner_wrapper__input" type="text" onChange={this.onChangeHandler} onBlur={this.onBlurHandler} value={this.state.selectedItem['title']} />
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