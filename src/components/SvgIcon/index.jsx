import React from 'react';
import { ReactSVG } from 'react-svg';

function getAll(context) {
  return context.keys().reduce((o, modulePath, i) => {
    o[modulePath.replace(/.\/|.svg/g, '')] = (props) => {
      return <ReactSVG src={context.keys().map(context)[i]} {...props} />;
    };
    return o;
  }, {});
}

export default getAll(require.context('./icons', false, /\.svg$/));
