
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://berlily29.github.io/Portfolio/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Portfolio"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KGGEOKV5.js"
    ],
    "route": "/Portfolio/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KGGEOKV5.js"
    ],
    "route": "/Portfolio/projects"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KGGEOKV5.js"
    ],
    "route": "/Portfolio/contacts"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5DK7S64W.js"
    ],
    "redirectTo": "/Portfolio/error/404",
    "route": "/Portfolio/error"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5DK7S64W.js"
    ],
    "route": "/Portfolio/error/404"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5DK7S64W.js"
    ],
    "route": "/Portfolio/error/503"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5DK7S64W.js"
    ],
    "redirectTo": "/Portfolio/error/404",
    "route": "/Portfolio/error/**"
  },
  {
    "renderMode": 2,
    "redirectTo": "/Portfolio/error/404",
    "route": "/Portfolio/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 26465, hash: '64c137f6c6963cf115dd3e6ba4c49d2d39081b53365ab3724e15f0426820d1ff', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1725, hash: '1dd1f3c2d6f97a454e3e80705ebc75976a10f9e6a2db41681864c8f29684efea', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 44202, hash: '5c685f9e6956d03f8a50dfcb75321ee43184ab0a2f3d5b7c6499fd342b1a03ba', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'error/404/index.html': {size: 29163, hash: '7cf06a4da6dc2e56c560fbb801cd79a3398327a2b84d6db267820efb050e129f', text: () => import('./assets-chunks/error_404_index_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 30328, hash: '8c2a8381fbd499c0482a47c260d7dfdaecc54f4117f7a980026d5c8b2b1799c5', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'index.html': {size: 44149, hash: 'ff8b93eb6a49aaa108e70b8aab214ed877faca7d225a791a0b9dd9e7d0c0308e', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'error/503/index.html': {size: 29163, hash: 'e613234ee6217359bc6a2160a7fdf273505683f0fdf524d73ae5981e9c169384', text: () => import('./assets-chunks/error_503_index_html.mjs').then(m => m.default)},
    'contacts/index.html': {size: 37846, hash: '72b2086c3279d0fea87a99c2643a9acff7238c72f988ff8de23fd4f4793ed5f7', text: () => import('./assets-chunks/contacts_index_html.mjs').then(m => m.default)},
    'styles-6VP7DNSR.css': {size: 41734, hash: 'Huj4WGIMjuQ', text: () => import('./assets-chunks/styles-6VP7DNSR_css.mjs').then(m => m.default)}
  },
};
