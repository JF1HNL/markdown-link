//コンテクストメニュー　右クリック時に出る表示のやつ
chrome.runtime.onInstalled.addListener(function() {
  const menu = chrome.contextMenus.create({
    "title" : "タイトル付きのリンクをコピー",
    "type"  : "normal",
    "onclick" : copylink()
  });
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
