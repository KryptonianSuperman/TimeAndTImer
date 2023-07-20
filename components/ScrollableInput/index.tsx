import React, { useState, useRef, useEffect, ReactNode, forwardRef, useImperativeHandle,ForwardedRef, SyntheticEvent, WheelEvent } from "react";
import "./styles.scss";

export type ScrollInputRefType = { value: number,  setValue: React.Dispatch<React.SetStateAction<number>>}
type ScrollableInputType = ({items}:{items: number[]},ref: ForwardedRef<ScrollInputRefType>) => ReactNode

const ScrollableInput: ScrollableInputType = ({items}, ref) =>  {
  const [selectedItem, setSelectedItem] = useState(0);
  const itemRefs = useRef<HTMLDivElement | null>(null);

  const prevElementIndex =(((selectedItem - 1) % items.length ) + items.length) % items.length 
  const nextElementIndex =(((selectedItem + 1) % items.length ) + items.length) % items.length 
  const valueOfPrevnumber = items[prevElementIndex]
  const valueOfNextnumber = items[nextElementIndex]
  const handleSwipe = (e:  WheelEvent<HTMLDivElement>) => {
    const deltaY = e.deltaY;
    if (deltaY > 0) {
      setSelectedItem((prevSelectedItem) =>
      (((prevSelectedItem + 1) % items.length ) + items.length) % items.length 
      );
    } else if (deltaY < 0) {
      setSelectedItem((prevSelectedItem) =>(((prevSelectedItem - 1) % items.length ) + items.length) % items.length);
    }
  };

  useEffect(() => {
    if (itemRefs.current) {
      itemRefs.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [selectedItem]);

  useImperativeHandle(ref, ()=>{
    return {
      value: selectedItem,
      setValue: setSelectedItem,
    }
  })

  return (
    <div className="item-list" onWheel={handleSwipe}>
      <div className="item-list-item previous">
        {typeof(valueOfPrevnumber) === "number" ? <div>{valueOfPrevnumber}</div> : null}
      </div>
      <div
        className="item-list-item selected"
        ref={(ref) => (itemRefs.current = ref)}
      >
        {items[selectedItem]}
      </div>
      <div className="item-list-item next">
        {typeof(valueOfNextnumber) === "number" ? <div>{valueOfNextnumber}</div> : null}
      </div>
    </div>
  );
}

export default forwardRef(ScrollableInput);
