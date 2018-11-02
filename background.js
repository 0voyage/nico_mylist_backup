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



// Called when the icon is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	window.alert('バックアップを開始します。');
	// Regex-pattern to check URLs against.
	// It matches URLs like: http[s]://[...]stackoverflow.com[...]
	/* var nicovideoURL = /^https?:\/\/(?:[^./?#]+\.)?stackoverflow\.com/;
	if (nicovideoURL.test(tab.url)) {
		//createANewFolder();
		chrome.tabs.executeScript(null, {file: "content.js"});
	} */
	chrome.tabs.executeScript(null, {file: "content.js"});
});
// When it receives a message
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		extractInfo(request);
	}
);
// Extract Info
function extractInfo(jsonData) {
	jsonData = JSON.parse(jsonData);
	var mylistName = jsonData.mylistName;
	var urlArray = jsonData.urlArray;
	window.alert("「" + mylistName + "」フォルダが、「その他のブックマーク」内に作成されます。");
	createANewFolder(mylistName, urlArray);
}
// Create a new folder in the Other Bookmarks folder
function createANewFolder(mylistName, urlArray){
	chrome.bookmarks.create(
		{'title': mylistName},
		function(newFolder) {
			addBookmarks(newFolder, urlArray);
		}
	);
}
// Create new bookmarks
function addBookmarks(bookmarkTreeNode, urlArray) {
	for (var i=0; i<urlArray.length; i++){
		// For each video...
		chrome.bookmarks.create(
	 		{'parentId': bookmarkTreeNode.id, "title": urlArray[i].videoTitle, 'url': urlArray[i].videoURL},
	 		function(newBookmark) {
				if (newBookmark.index+1===urlArray.length) {
					window.alert(newBookmark.index+1 + '個のブックマークが追加されました。');
				} else {}
	 		}
		);
	}
}
