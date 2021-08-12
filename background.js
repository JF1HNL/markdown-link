//コンテクストメニュー　右クリック時に出る表示のやつ
chrome.runtime.onInstalled.addListener(function() {
  const menu = chrome.contextMenus.create({
    "title" : "リンクをコピー",
    "contexts" : ["selection", "page"],
    "type"  : "normal",
    "id": "parent"
  });

  const title_link = chrome.contextMenus.create({
    type: "normal",
    id: "title_link",
    parentId: "parent",
    title: "タイトルとリンクをコピー",
    contexts : ["selection", "page"],
    onclick : function(info, tab){

      const geted_data = {
        "url" : info.pageUrl,
        "title" : tab.title
      }
      saveToClipboard(`${geted_data.title} ${geted_data.url}`)

    }
  })

  const markdown_link = chrome.contextMenus.create({
    type: "normal",
    id: "markdown_link",
    parentId: "parent",
    title: "markdown形式でコピー",
    contexts : ["selection", "page"],
    onclick: function(info, tab){

      const geted_data = {
        "url" : info.pageUrl,
        "title" : tab.title
      }
      saveToClipboard(`[${geted_data.title}](${geted_data.url})`)

    }
  })

  const select_menu = chrome.contextMenus.create({
    type: "normal",
    id: "select_parent",
    title: "選択部分とリンクをコピー",
    contexts : ["selection"]
  })

  const select_link_only = chrome.contextMenus.create({
    type: "normal",
    parentId: "select_parent",
    title: "選択部分のリンクのみコピー",
    contexts : ["selection"],
    onclick: function(info, tab){

      const geted_data = {
        "url" : info.pageUrl,
        "title" : tab.title,
        "text" : info.selectionText
      }
      saveToClipboard(`${geted_data.url}#:~:text=${encodeURI(geted_data.text)}`)

    }
  })

  const select_link = chrome.contextMenus.create({
    type: "normal",
    parentId: "select_parent",
    title: "選択部分とタイトル、リンクをコピー",
    contexts : ["selection"],
    onclick: function(info, tab){

      const geted_data = {
        "url" : info.pageUrl,
        "title" : tab.title,
        "text" : info.selectionText
      }
      saveToClipboard(`"${geted_data.text}" ${geted_data.title}(${geted_data.url}#:~:text=${encodeURI(geted_data.text)})`)

    }
  })

  const select_markdown = chrome.contextMenus.create({
    type: "normal",
    parentId: "select_parent",
    title: "選択部分のリンクをmarkdownでコピー",
    contexts : ["selection"],
    onclick: function(info, tab){

      const geted_data = {
        "url" : info.pageUrl,
        "title" : tab.title,
        "text" : info.selectionText
      }
      saveToClipboard(`["${geted_data.text}" ${geted_data.title}](${geted_data.url}#:~:text=${encodeURI(geted_data.text)})`)

    }
  })
});
  
//選択中の文字列を取得する関数
function copylink(info,tab){
  return function(info,tab){

    console.log(info)
    console.log(tab)
    const geted_data = {
      "url" : info.pageUrl,
      "title" : tab.title
    }
    console.log(geted_data)
    saveToClipboard(`[${geted_data.title}](${geted_data.url})`)
  }
}
  
//選択中文字列をクリップボードに入れる
function saveToClipboard(str) {
  var textArea = document.createElement("textarea");

  document.body.appendChild(textArea);

  textArea.value = str;
  textArea.select();
  document.execCommand("copy");

  document.body.removeChild(textArea);
}
