import React, { Component } from 'react';

import "./DataList.scss";
import downArrowSvg from "@/styles/images/icons/common/datalist/down_arrow.svg";
import classNames from 'classnames';

import Utility from "@/helper/utility";

export default class DataList extends Component {
  constructor(props) {
    super();
    const { selectedItem } = props;
    this.state = {
      selectedItem: selectedItem,
      showItemList: [],
      isEditing: false,
      id: _.uniqueId("baikal_dl__input__"),
    };
    this.inputRef = React.createRef();

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onItemMouseDownHandler = this.onItemMouseDownHandler.bind(this);
    this.onLabelClickHandler = this.onLabelClickHandler.bind(this);
    this.onKeyPressHandler = this.onKeyPressHandler.bind(this);
  }

  onChangeHandler(event) {
    console.log("DataList [onChangeHandler]")
    const dummySelected = {
      id: -1,
      title: '',
    }
    const itemFragment = event.target.value;

    if (itemFragment.length > 0) {
      const itemFragmentRegExp = new RegExp('^(' + itemFragment + '.*)$', 'gi');
      const newShowItemList =
        this.props.dictItemList.filter(
          (item) => item['title'].match(itemFragmentRegExp) !== null
        );

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
    const blurType = event.nativeEvent.type;
    if (blurType === "focusout") {
      console.log("DataList [onBlurHandler] focusout")
      const itemFragment = event.target.value;
      let newSelectedItem = this.props.dictItemList[0];
      if (itemFragment.length > 0) {
        const itemFragmentRegExp = new RegExp('^(' + itemFragment + '.*)$', 'gi');
        const filteredDictItemList =
          this.props.dictItemList.filter(
            (item) => item['title'].match(itemFragmentRegExp) !== null
          );

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
  }

  onItemMouseDownHandler(event) {
    // event is capture on <li><span>...
    console.log("DataList [onItemMouseDownHandler]")
    let newSelectedItemValue = event.target.innerHTML;

    // event is captured on <li>
    let newSelectedItem = event.target.querySelector('span.baikal_dl__content_list__item__text');
    if (newSelectedItem) {
      newSelectedItemValue = newSelectedItem.innerHTML;
    }

    const itemFragmentRegExp = new RegExp('^(' + newSelectedItemValue + '.*)$', 'gi');
    const newShowItemList = this.props.dictItemList.filter(
      (item) => item['title'].match(itemFragmentRegExp) !== null
    );

    if (newShowItemList.length !== 0) {
      this.setState({
        selectedItem: newShowItemList[0],
        showItemList: [],
        isEditing: false,
      });
      this.props.attributeChangeHandler(newShowItemList[0]);
    }
  }

  onLabelClickHandler(event) {
    console.log("DataList [onLabelClickHandler]")
    const newShowItemList = this.props.dictItemList.slice(0, this.props.dictItemList.length);
    this.setState((prevState) => {
      if (!prevState.isEditing) {
        this.inputRef.current.focus();
      }
      if (prevState.isEditing) {
        return {
          showItemList: [],
          isEditing: false,
        }
      } else {
        return {
          showItemList: newShowItemList,
          isEditing: true,
        }
      }
    })
  }

  onKeyPressHandler(event) {
    console.log("DataList [onKeyPressHandler] charCode " + event.charCode);
    const newShowItemList = this.props.dictItemList.slice(0, this.props.dictItemList.length);
    let newSelectedItem = this.state.selectedItem;
    switch (event.keyCode) {
      case 38:
        //prev
        newSelectedItem = Utility.getPrevElement(newShowItemList, newSelectedItem);
        break;

      case 40:
        // next
        newSelectedItem = Utility.getNextElement(newShowItemList, newSelectedItem);
        break;

      case 13:
        // enter
        break;
    }

    const isChangedItem = newSelectedItem['id'] !== this.state.selectedItem['id'];
    this.setState({
      isEditing: event.keyCode !== 13,
      selectedItem: newSelectedItem,
      showItemList: newShowItemList,
    });
    if (isChangedItem) {
      this.props.attributeChangeHandler(newSelectedItem);
    }
  }

  getShowItemList() {
    console.log("DataList [getShowItemList]")
    const { showItemList, isEditing } = this.state;

    if (!isEditing) {
      return null;
    } else {
      return (
        showItemList.map(
          (item) => {
            const listItemClass = this.props.listItemClass;
            const selectedItem = this.state.selectedItem;
            const listItemClassname = classNames("baikal_dl__content_list__item",
              listItemClass,
              { 'baikal_dl_active_item': (selectedItem['id'] === item['id']) }
            );
            return (
              <li key={item['id'] + '_' + item['title']}
                className={listItemClassname}
                onMouseDown={this.onItemMouseDownHandler}>
                <span className="baikal_dl__content_list__item__text">{item['title']}</span>
              </li>)
          }
        )
      );
    }
  }

  render() {
    const { isEditing, id } = this.state;
    const { label, isInvalid, wrapperClass, inputClass } = this.props;

    const wrapperClassname = classNames("baikal_dl", wrapperClass);
    const inputClassname = classNames("baikal_dl__input_wrapper__input_inner_wrapper__input", inputClass);
    const inputWrapperClassname = classNames('baikal_dl__input_wrapper', { 'is_baikal_invalid_input': isInvalid });
    const inputLabelClassname = classNames("baikal_dl__label",
      {
        'baikal_dl__label__active': isEditing,
        'is_baikal_invalid_label': isInvalid
      });

    const selectArrowClassname = classNames("baikal_dl__input_wrapper__input_inner_wrapper__down_arrow",
      {
        'baikal_dl_up_end': isEditing
      });

    return (
      <div className={wrapperClassname}>
        {label && <label htmlFor={id}
          onClick={this.onLabelClickHandler}
          className={inputLabelClassname}>{this.props.label}</label>}

        <div className={inputWrapperClassname}>
          <div className="baikal_dl__input_wrapper__input_inner_wrapper">
            <input name={id}
              id={id}
              ref={this.inputRef}
              className={inputClassname}
              type="text" onChange={this.onChangeHandler}
              onKeyDown={this.onKeyPressHandler}
              onBlur={this.onBlurHandler}
              value={this.state.selectedItem['title']} />

            <img src={downArrowSvg} alt="Down Arrow"
              className={selectArrowClassname}
              onClick={this.onLabelClickHandler} />
          </div>
          <div className="baikal_dl__input_wrapper__border"></div>
        </div>
        <ul className="baikal_dl__content_list">
          {this.getShowItemList()}
        </ul>
      </div>
    );
  }
}