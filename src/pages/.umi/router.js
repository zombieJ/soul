import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.jsx').default,
    "routes": [
      {
        "0": "c",
        "1": "l",
        "2": "a",
        "3": "s",
        "4": "s",
        "5": " ",
        "6": "E",
        "7": "d",
        "8": "i",
        "9": "t",
        "10": " ",
        "11": "e",
        "12": "x",
        "13": "t",
        "14": "e",
        "15": "n",
        "16": "d",
        "17": "s",
        "18": " ",
        "19": "R",
        "20": "e",
        "21": "a",
        "22": "c",
        "23": "t",
        "24": ".",
        "25": "C",
        "26": "o",
        "27": "m",
        "28": "p",
        "29": "o",
        "30": "n",
        "31": "e",
        "32": "n",
        "33": "t",
        "34": "<",
        "35": "E",
        "36": "d",
        "37": "i",
        "38": "t",
        "39": "P",
        "40": "r",
        "41": "o",
        "42": "p",
        "43": "s",
        "44": ",",
        "45": " ",
        "46": "a",
        "47": "n",
        "48": "y",
        "49": ">",
        "50": " ",
        "51": "{",
        "path": "/edit",
        "exact": true,
        "component": require('../edit/index.tsx').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.jsx').default
      },
      {
        "component": () => React.createElement(require('/Users/jilin/projects/soul/node_modules/_umi-build-dev@1.0.0-beta.7@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/jilin/projects/soul/node_modules/_umi-build-dev@1.0.0-beta.7@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
  }
];

export default function() {
  return (
<Router history={window.g_history}>
      <Route render={({ location }) =>
        renderRoutes(routes, {}, { location })
      } />
    </Router>
  );
}
