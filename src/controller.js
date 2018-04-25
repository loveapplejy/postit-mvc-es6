import Store from './store';
import View from './view';

export default class Controller {
  constructor(store, view) {
    this.view = view;
    this.store = store;

    view.bindAddPostit(this.addPostit.bind(this));
    view.bindClearAll(this.clearAll.bind(this));
    view.bindOrderPostit(this.orderPostit.bind(this));
    view.bindRemovePostit(this.removePostit.bind(this));
    view.bindEditPostit(this.editPostit.bind(this));
    view.bindTogglePostit(this.togglePostit.bind(this));
    view.bindPostitContextEvent(this.postitContextEvent.bind(this));
    view.bindContextMenu(this.clickContextMenu.bind(this));
    view.bindMove(this.movePostit.bind(this));

    view.showPostitList(store.getLocalStorage());
  }

  addPostit() {
    this.store.insert({
      id: Date.now(),
      content: '',
      background: '#ff9690',
      fontSize: '12px',
      color: '#333',
      expand: true,
      translate: 'translate(0px, 0px)'
    }, this.view.showPostit.bind(this.view));
  }

  removePostit(id) {
    this.store.remove(id, this.view.showPostitList.bind(this.view));
  }

  clearAll() {
    this.store.clear(this.view.showPostitList.bind(this.view));
  }

  editPostit(id, options, isRefesh) {
    options.id = id;

    if (!isRefesh) {
      this.store.edit(options);
    } else {
      this.store.edit(options, this.view.showPostitList.bind(this.view));
    }

  }

  togglePostit(id, expand) {
    this.store.edit({id, expand}, this.view.showPostitList.bind(this.view));
  }

  orderPostit(id, expand) {
    this.store.order(this.view.showPostitList.bind(this.view));
  }

  postitContextEvent(id, callback, type) {
    switch (type) {
      case 'expand' :
        const item = this.store.find(id);
        callback(item);
    }
  }

  clickContextMenu(id, callback, type, data) {
    switch (type) {
      case 'expand':
        const item = this.store.find(id);
        this.togglePostit(id, !item.expand);
        break;
      case 'remove':
        this.removePostit(id);
        break;
      case 'order':
        this.orderPostit(id);
        break;
      case 'edit-fontsize':
        this.editPostit(id, {fontSize: data}, true);
        break;
      case 'edit-backgroud':
        return this.editPostit(id, {background: data}, true);
        break;
      case 'edit-color':
        return this.editPostit(id, {color: data}, true);
        break;

    }

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  movePostit(id, options) {
    this.editPostit(id, options, false);
  }


}