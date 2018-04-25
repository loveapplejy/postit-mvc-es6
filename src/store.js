export default class Store {
  constructor(name, callback) {
    const localStorage = window.localStorage;

    // post-it list
    let list;

    let sample = [{
        id: Date.now(),
        content: '메모를 하십시오!',
        background: '#ff9690',
        fontSize: '12px',
        color: 'black',
        expand: true,
        translate: 'translate(0px, 0px)',
        headerTitle: '헤더를 이용하여 드래그 가능합니다',
        isSample: true
    }];

    this.getLocalStorage = () => {
      if (!list) {
        list = JSON.parse(localStorage.getItem(name));
      }

      return list;
    };


    this.setLocalStorage = (data) => {
      localStorage.setItem(name, JSON.stringify(list = data));
    };

    this.getLocalStorage();

    if (list && !list.length) {
      this.setLocalStorage(sample);
    }
  }

  find(id) {
    const list = this.getLocalStorage();

    return list.filter((v) => {
      return v['id'] === id;
    })[0];
  }

  insert(data, callback) {
    const list = this.getLocalStorage();
    list.push(data);

    this.setLocalStorage(list);

    if (callback) {
      callback(data);
    }
  }

  remove(id, callback) {
    const list = this.getLocalStorage().filter(item => {
      if (id !== item['id']) {
        return true;
      }
      return false;
    });

    this.setLocalStorage(list);

    if (callback) {
      callback(list);
    }
  }

  edit(options, callback) {
    const {id} = options;

    let list = this.getLocalStorage();
    list.forEach(v => {
      if (v['id'] === id) {
        Object.keys(options).forEach(key => {
          v[key] = options[key];
        })
      }
    })

    this.setLocalStorage(list);

    if (callback) {
      callback(list);
    }
  }

  clear(callback) {
    this.setLocalStorage([]);

    let list = this.getLocalStorage();
    if (callback) {
      callback(list);
    }
  }

  order(callback) {
    let list = this.getLocalStorage();

    list.sort(function (a, b) {
      return a.id - b.id;
    })

    list.forEach(v => {
      v['translate'] = 'translate(0px, 0px)';
    });

    this.setLocalStorage(list);

    if (callback) {
      callback(list);
    }
  }
}
