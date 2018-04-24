import Controller from './controller';
import Template from './template';
import Store from './store';
import View from './view';

import './css/reset.css';
import './css/common.css';

const store = new Store('postit_list');

const template = new Template();
const view = new View(template);

const controller = new Controller(store, view);
