browser.browserAction.setBadgeBackgroundColor({
    color: "#00b2b9"
});
countTabs();
browser.tabs.onCreated.addListener(countTabs);
browser.tabs.onRemoved.addListener(countTabs);
browser.tabs.onAttached.addListener(countTabs);


function countTabs() {
    setTimeout(function () {
        browser.tabs.query({}).then(function (tabs) {
            //リスト作成
            list = {};
            for (let tab of tabs) {
                if (list[tab.windowId] == undefined) list[tab.windowId] = {};
                list[tab.windowId][tab.id] = tab.id;
            }
            //タブごとにバッジ表示
            for (let window in list) {
                tabNumber = Object.keys(list[window]).length;
                for (let tab in list[window]) {
                    browser.browserAction.setBadgeText({
                        text: String(tabNumber),
                        tabId: parseInt(tab)
                    });
                }
            }
        });
    }, 300)
}
