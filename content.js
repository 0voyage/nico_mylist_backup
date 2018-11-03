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



// You can access DOM contents only from content_script.
// Extract URLs from a MyList page & Send them to background.js

var mylistName = "";
var videoArray = [];
var finalArray = [];

// Find mylist name
mylistName = document.getElementById("myContHead").children[0].innerText;

// List video titles & URLs
var videos = document.getElementsByClassName("mylistVideo");
for (var i=0; i<videos.length; i++){
	// For each video <a> tag...
	var videoInfo = videos[i].children[0].children[0];

	// Video Title & URL
	var videoTitle = videoInfo.innerText;
	var videoURL = "http://www.nicovideo.jp" + videoInfo.getAttribute('href');

	// Set in the array
	videoArray.push({"title": videoTitle, "url": videoURL});
}

// Combine
finalArray = {"mylistName": mylistName, "videoArray": videoArray};

// Send it to background.js
chrome.runtime.sendMessage(JSON.stringify(finalArray));
