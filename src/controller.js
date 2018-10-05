export default class Controller {
  constructor(store, view) {
    this.view = view;
    this.store = store;

    view.bindAddPostit(this.addPostit.bind(this)); // post-it 추가
    view.bindOrderPostit(this.orderPostit.bind(this)); // post-it list 정렬
    view.bindRemovePostit(this.removePostit.bind(this)); // post-it 삭제
    view.bindClearAll(this.clearAll.bind(this)); // post-it list 전체 삭제
    view.bindEditPostit(this.editPostit.bind(this)); // post-it 수정
    view.bindTogglePostit(this.togglePostit.bind(this)); // post-it 펼치기/접기
    view.bindContextEvent(this.postitContextEvent.bind(this)); // postit context menu 클릭이벤트
    view.bindContextMenu(this.clickContextMenu.bind(this)); //
    view.bindMove(this.movePostit.bind(this));

    view.renderPostitList(store.getLocalStorage());
  }

  addPostit() {
    const postit = {
      id: `id_${Date.now()}`,
      content: '',
      background: '#ff9690',
      fontSize: '12px',
      color: '#333',
      expand: true,
      translate: 'translate(0px, 0px)'
    };

    this.store.insert(postit, this.view.renderPostit.bind(this.view));
  }

  removePostit(id) {
    this.store.remove(id, this.view.renderPostitList.bind(this.view));
  }

  clearAll() {
    this.store.clear(this.view.renderPostitList.bind(this.view));
  }

  editPostit(id, options, isRefesh) {
    options.id = id;

    if (!isRefesh) {
      this.store.edit(options);
    } else {
      this.store.edit(options, this.view.renderPostitList.bind(this.view));
    }

  }

  togglePostit(id, expand) {
    this.store.edit({id, expand}, this.view.renderPostitList.bind(this.view));
  }

  orderPostit() {
    this.store.order(this.view.renderPostitList.bind(this.view));
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