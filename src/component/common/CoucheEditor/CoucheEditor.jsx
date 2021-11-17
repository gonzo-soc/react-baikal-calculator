import React, { Component } from 'react';

import "./CoucheEditor.scss";

import ShippingContext from "@/store/ShippingContext";
import {getCoucheDictData} from "@/store/data/CoucheDictData";

export default function CoucheEditor(props) {
  const [coucheDictItem] = props;

  return (
    <div className="couche_editor">
      <h2>Couche Editor: {coucheDictItem['title']}</h2>
    </div>
  )
}
