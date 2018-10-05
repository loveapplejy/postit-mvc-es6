export default class Template {
  constructor() {
    this.defaultTemplate = `<div class="header">
      <span class="title">{{title}}</span>
      <span class="remove">x</span>
      <span class="caret"></span>
  </div>
  <div class="content">
    <textarea style="font-size:{{font}}; color:{{color}}">{{content}}</textarea>
  </div>`;

    this.contextTemplate = `<div class="context-menu" data-id="{{id}}">
    <ul class="items">
        <li class="edit-backgroud">배경 색상 변경
            <select class="background">
                <option value="#ff9690" {{background#ff9690}}>Default</option>
                <option value="#ffbf37" {{background#ffbf37}}>Yellow</option>
                <option value="#36fed0" {{background#36fed0}}>Green</option>
                <option value="#63c2ff" {{background#63c2ff}}>Blue</option>
                <option value="#9d83ff" {{background#9d83ff}}>Purple</option>
            </select>
        </li>
        <li class="edit-fontsize">글자 크기 선택
            <select class="fontsize">
                <option value="12px" {{fontsize12px}}>12px</option>
                <option value="13px" {{fontsize13px}}>13px</option>
                <option value="14px" {{fontsize14px}}>14px</option>
                <option value="20px" {{fontsize20px}}>20px</option>
            </select>
        </li>
        <li class="edit-color">글자 색상 변경
            <select class="color">
                <option value="#333" {{color#333}}>Black</option>
                <option value="#fff" {{color#fff}}>White</option>
                <option value="#F74A45" {{color#F74A45}}>Red</option>
            </select>
        </li>
    </ul>
    <hr/>
    <ul class="items">
        <li class="expand">{{expand}}</li>
    </ul>
    <hr/>
    <ul class="items">
        <li class="remove">삭제하기</li>
    </ul>
</div>`;
  }

  list(items) {
    return items ? items.reduce((prev, item) => {

      let template = this.defaultTemplate;

      template = template.replace(/{{title}}/g, item.hasOwnProperty('headerTitle') ? item.headerTitle : item.content.slice(0, 50));
      template = template.replace(/{{content}}/g, item.content);
      template = template.replace(/{{font}}/, item.fontSize);
      template = template.replace(/{{color}}/, item.color);

      return prev + `
<div class="postit ${item.expand ? 'expand' : ''} ${item.isSample ? 'showTitle' : ''}" draggable="true" style="background:${item.background}; transform: ${item.translate}" data-id="${item.id}"> 
${template}
</div>`;
    }, '') : '';
  }

  postit(item) {
    let template = this.defaultTemplate;

    template = template.replace(/{{title}}/g, item.content.slice(0, 50));
    template = template.replace(/{{content}}/g, item.content);
    template = template.replace(/{{font}}/, item.fontSize);
    template = template.replace(/{{color}}/, item.color);

    return template;
  }

  contextMenu(item) {
    let template = this.contextTemplate;

    template = template.replace(/{{id}}/g, item.id);
    template = template.replace(/{{expand}}/g, item.expand ? "접기" : "펼치기");
    template = template.replace(`{{background${item.background}}}`, 'selected="selected"');
    template = template.replace(`{{color${item.color}}}`, 'selected="selected"');
    template = template.replace(`{{fontsize${item.fontSize}}}`, 'selected="selected"');

    return template;
  }
}

