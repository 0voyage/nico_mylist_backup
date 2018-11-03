/*
Copyright 2018 voyage
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



// When the icon is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	window.alert('バックアップを開始します。');
	chrome.tabs.executeScript(null, {file: "content.js"});
});

// When background.js receives a message
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		extractInfoFromMylist(request);
	}
);

function extractInfoFromMylist(jsonData) {
	da = JSON.parse(jsonData);
	window.alert("「" + da.mylistName + "」フォルダが、「その他のブックマーク」内に作成されます。");
	createANewBookmarkFolder(da.mylistName, da.videoArray);
}

function createANewBookmarkFolder(mylistName, videoArray){
	chrome.bookmarks.create(
		{'title': mylistName},
		function(newFolder) {
			addBookmarksToTheFolder(newFolder, videoArray);
		}
	);
}

function addBookmarksToTheFolder(bookmarkTreeNode, videoArray) {
	for (var i=0; i<videoArray.length; i++){
		// For each video...
		chrome.bookmarks.create(
	 		{'parentId': bookmarkTreeNode.id, "title": videoArray[i].title, 'url': videoArray[i].url},
	 		function(newBookmark) {
				if (newBookmark.index+1===videoArray.length) {
					window.alert(newBookmark.index+1 + '個のブックマークが追加されました。');
				} else {}
	 		}
		);
	}
}
