class Utility {
  static getOrientationChangeEventName() {
    ("use strict");
    const supportsOrientationChange = "onorientationchange" in window;
    let orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    orientationEvent = window.screen && window.screen.orientation ? 'change' : 'resize';

    return orientationEvent;
  }


  static getWindowSize() {
    // debugger;
    ("use strict");

    let w = Math.max(window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth);

    let h = Math.max(window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight);

    return {
      wWidth: w,
      wHeight: h,
    };
  }

  static getPrevElement(dictItemList, currentItem) {
    if (!currentItem || !currentItem['id']) {
      console.warn("Utility [getPrevElement] Could not find the prev element: no id detected");
      return undefined;
    }

    for (let i = 0; i < dictItemList.length; i++) {
      if (dictItemList[i]['id'] === currentItem['id']) {
        return i - 1 < 0 ? currentItem : dictItemList[i - 1];
      }
    }

    return null;
  }

  static getNextElement(dictItemList, currentItem) {
    if (!currentItem || !currentItem['id']) {
      console.warn("Utility [getPrevElement] Could not find the prev element: no id detected");
      return undefined;
    }

    for (let i = 0; i < dictItemList.length; i++) {
      if (dictItemList[i]['id'] === currentItem['id']) {
        return i + 1 === dictItemList.length ? currentItem : dictItemList[i + 1];
      }
    }
    return null;
  }
}

export default Utility;