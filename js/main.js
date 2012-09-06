 
    // Activity 1 1209
	// Mobile Interfaces and Usability
	// Mobile Development
	// Full Sail University
	// Jonathan Wade
	

   

 	
    //Wait until the DOM has loaded
    window.addEventListener("DOMContentLoaded", function(){
	 	
 	
 	//Displays the value of the Range Slider for rating
 	function showValue() {
 		var newValue = getEl("rating").value;
 		getEl("range").innerHTML=newValue;
	}

	//Toggles the date field depending on the "Need to Learn" radio button selection
	function toggleMe(){
		getEl("learnByDate").style.display="block";		
	}
	
 
	function toggleMe2(){
			getEl("learnByDate").style.display="none";
			getEl("learnBy").value="";
				
	}

	  
 	//getElementByID Function
 	function getEl(x){
 		var theElement = document.getElementById(x);
 		return theElement;
 	}

 	//Create select field element and populate with options
 	function createGenres() {
	 	var formTag = getEl("mainForm"),
		 	selectLi = getEl("select"),
		 	makeSelect = document.createElement("select");
		 	makeSelect.setAttribute("id", "genres");
		 for(var i=0, j=songGenre.length; i<j; i++){
			 var makeOption = document.createElement("option");
			 var optText = songGenre[i];
			 makeOption.setAttribute("value", optText);
			 makeOption.innerHTML = optText;
			 makeSelect.appendChild(makeOption);
		 }
		 selectLi.appendChild(makeSelect);
	}
	
	//Find Value of selected radio button
	function getRadioValue(){
		var radio = document.forms[0].learn;
			for(var i=0; i<radio.length; i++){
				if(radio[i].checked){
					learnValue = radio[i].value;
			}
		}
	}
	
	//Find Value of Checkbox
	function getCheckValue(){
		if(getEl("sitIn").checked){
			sitInValue = getEl("sitIn").value;
		}else{
			sitInValue = "No";
		}
	}
	

 	//Toggles between data input mode and data view mode
 	function toggleControls(n) {
	 	switch(n){
		 	case "on":
		 		getEl("mainForm").style.display = "none";
		 		getEl("clearList").style.display = "inline";
		 		getEl("viewList").style.display = "none";
		 		getEl("addNew").style.display = "inline";
		 		break;
		 	case "off":
		 		getEl("mainForm").style.display = "block";
		 		getEl("clearList").style.display = "inline";
		 		getEl("viewList").style.display = "inline";
		 		getEl("addNew").style.display = "none";
		 		getEl("item").style.display = "none";
		 		break;
		 	default:
		 		return false;
		 		
	 	}
 	}
 	
 	//Stores form data into Local Storage
	function storeData(key){
	//If there is no key, this means this is a brand new item and we need a new key
	if(!key){
		var id 					= Math.floor(Math.random()*1000001);
	}else{
		//Set the id to the existing key we're editing so that it will save over the existing data.
		//This is key is the same key that has been passed along from the editSubmit event handler
		//to the validate function, and then passed here, into the storeData function.
		id = key;
	}
		// Gather up all of our form field values and store them in an object.
		//Object properties contain array with the form label and input value which will allow us to label the data.
		getRadioValue();
		getCheckValue();
		var item 				= {};
			item.genres			= ["Genre:", getEl("genres").value];
			item.songName		= ["Title:", getEl("songName").value];
			item.artist			= ["Artist:", getEl("artist").value];
			item.rating			= ["Rating:", getEl("rating").value];
			item.needToLearn	= ["Need to learn:", learnValue];
			item.learnBy		= ["Learn By:", getEl("learnBy").value];
			item.sitIn			= ["Sit In:", sitInValue];
			item.tip			= ["Tip:", getEl("tip").value];
			item.notes			= ["Notes:", getEl("notes").value];
		//Save data into Local Storage: Use "Stringify" to convert our objects to strings (Local storage can only store strings
		localStorage.setItem(id, JSON.stringify(item));
		alert("Song Saved!"); 		
 	}
 	
 	
 	
 	//Retreives data from local storage
 	function getData(){
 		toggleControls("on");
 		if(localStorage.length === 0) {
	 		autoFillData();
	 		alert("Nothing has been saved yet so default data has been added.");
	 		
 		}
	 	//Write data from localStorage to the Browser
	 	var makeDiv = document.createElement("div");
	 	makeDiv.setAttribute("id", "item");
	 	var makeList = document.createElement("ul");
	 	makeDiv.appendChild(makeList);
	 	document.body.appendChild(makeDiv);
	 	getEl("item").style.display = "block";
	 	for(var i = 0, j = localStorage.length; i<j; i++){
		 	var makeLi = document.createElement("li");
		 	var linksLi = document.createElement('li');
		 	makeList.appendChild(makeLi);
		 	var key = localStorage.key(i);
		 	var value = localStorage.getItem(key);
		 	// Here we are converting our localStorage string value back into an object using JSON.parse().
		 	var item = JSON.parse(value);
		 	var makeSubList = document.createElement("ul");
		 	makeSubList.setAttribute("id", "entry");
		 	makeLi.appendChild(makeSubList);
		 	getImage(item.genres[1], makeSubList);
		 	for(var n in item){
			 	var makeSubLi = document.createElement("li");
			 	makeSubList.appendChild(makeSubLi);
			 	var dataInfo = item[n][0]+" "+item[n][1];
			 	makeSubLi.innerHTML = dataInfo;
			 	makeSubList.appendChild(linksLi);
		 	}
		 	//Creates edit and delete links for each item submitted to local storage
		 	makeItemLinks(localStorage.key(i), linksLi); 	
	 	}	
 	}
 	
 	function getImage(genreName, makeSubList) {
	 	//Get the image for the right catagory that's being displayed.
	 	var imgLi = document.createElement('li');
	 	makeSubList.appendChild(imgLi);
	 	var newImg = document.createElement('img');
	 	newImg.setAttribute("id", "pic");
	 	var setSource = newImg.setAttribute("src", "img/"+ genreName + ".png");
	 	imgLi.appendChild(newImg);
 	}
 	function autoFillData() {
	 	//Actual json object data required for this to work is coming from our json.js file which is loaded from our HTML page.
	 	//Store json object into local storage.
	 	for(var n in json){
		 	var id = Math.floor(Math.random()*1000001);
		 	localStorage.setItem(id, JSON.stringify(json[n]));
	 	}
 	}
 	
 	//Make Item Links
 	//Creates the edit and delete links for each stored item when displayed
 	function makeItemLinks(key, linksLi) {
 		//Add edit single item link
	 	var editLink = document.createElement('a');
	 	editLink.href = "#";
	 	editLink.key = key;
	 	var editText = "Edit Song";
	 	editLink.addEventListener("click", editItem);
	 	editLink.setAttribute("id", "editLink");
	 	editLink.innerHTML = editText;
	 	linksLi.appendChild(editLink);
	 	
	 	/*
//Add line break
	 	var breakTag = document.createElement('br');
	 	linksLi.appendChild(breakTag);
*/
	 	
	 	//Add delete single item link
	 	var deleteLink = document.createElement('a');
	 	deleteLink.href = "#";
	 	deleteLink.key = key;
	 	var deleteText = "Delete Song";
	 	deleteLink.addEventListener("click", deleteItem);
	 	deleteLink.setAttribute("id", "deleteLink");
	 	deleteLink.innerHTML = deleteText;
	 	linksLi.appendChild(deleteLink);
 	}
 	
 	function editItem() {
		//Grab the data for our items in Local Storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show Form Field
		toggleControls("off");
		
		//Populate the form fields with current localStorage values.
		getEl("genres").value = item.genres[1];
		getEl("songName").value = item.songName[1];
		getEl("artist").value = item.artist[1];
		getEl("rating").value = item.rating[1];
		showValue();
		
		
		//For Radio buttons
		var radio = document.forms[0].learn;
		for(var i = 0; i< radio.length; i++){
			if(radio[i].value == "yes" && item.needToLearn[1] == "yes") {
				radio[i].setAttribute("checked", "checked");
				toggleMe();
				getEl("learnBy").value = item.learnBy[1];
			}else if(radio[i].value == "no" && item.needToLearn[1] == "no") {
				radio[i].setAttribute("checked", "checked");
				toggleMe2();
			}
		}
		
		//For Check Box
		if(item.sitIn[1] == "on") {
			getEl("sitIn").setAttribute("checked", "checked");
		}
		getEl("tip").value = item.tip[1];
		getEl("notes").value = item.notes[1];
		
		//Remove the initial listener form the input 'save contact' button
		addSong.removeEventListener("click", storeData);
		//Change submit button value to say edit edit
		getEl("submitButton").value = "Edit Song Info";
		var editSubmit = getEl("submitButton");
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		
 	}
 	
 	function deleteItem() {
	 	var ask = confirm("Delete Song?");
	 	if(ask) {
		 	localStorage.removeItem(this.key);
		 	window.location.reload();
	 	}else{
		 	alert("Whew, that was a close one!");
		 	
	 	}
 	}
 	
 	//Retrieves and applies supported box shadow properties depending on Browser. 
 	function getsupportedprop(proparray){
    	var root=document.documentElement; //reference root element of document
    	for (var i=0; i<proparray.length; i++){ //loop through possible properties
        	if (typeof root.style[proparray[i]]=="string"){ //if the property value is a string (versus undefined)
            return proparray[i]; //return that string
        }
    }
}
 	
 	//Validate our form fields
 	function validate(e){
 		//Define the elements we want to check
 		
 		var boxshadowprop=getsupportedprop(['boxShadow', 'MozBoxShadow', 'WebkitBoxShadow']); //get appropriate CSS3 box-shadow property
 		var getGenres = getEl("genres");
 		var getSongName = getEl("songName");
 		var getArtist = getEl("artist");
 		
 		//Reset error messages
 		errMsg.innerHTML = "";
		getGenres.style.border = "";
		getSongName.style.border = "";
		getArtist.style.border = "";
		getSongName.style.background = "";
	 	getArtist.style.background = "";
	 	getSongName.style[boxshadowprop]="";
	 	getArtist.style[boxshadowprop]="";
 			
 		//Get error messages
 		var messageErrorArray = [];
 		//Genres validation
 		if(getGenres.value === "*Pick A Genre!") {
	 		var genreError = "Please select a Genre.";
	 		getGenres.style.border = "2px solid rgba(255,0,0,0.2)";
	 		messageErrorArray.push(genreError);
 		}
 		
 		//Song Title validation
 		if(getSongName.value === ""){
	 		var songNameError = "Please enter a Song Title.";
	 		getSongName.style.border = "2px solid white";
	 		getSongName.style.background = "rgba(255,0,0,0.2)";
	 		getSongName.style[boxshadowprop]="inset 1px 2px 3px rgba(0,0,0,0.55)";//set CSS shadow for "mydiv"
	 		messageErrorArray.push(songNameError);
 		}
 		//Artist name validation
 		if(getArtist.value === ""){
	 		var artistNameError = "Please enter the Artists name.";
	 		getArtist.style.border = "2px solid white";
	 		getArtist.style.background = "rgba(255,0,0,0.2)";
	 		getArtist.style[boxshadowprop]="inset 1px 2px 3px rgba(0,0,0,0.55)";
	 		messageErrorArray.push(artistNameError);
 		}
 		
 		//If errors exist, display them on the screen.
 		if(messageErrorArray.length >= 1) {
	 		for(var i = 0, j = messageErrorArray.length; i < j; i++) {
		 		var txt = document.createElement('li');
		 		txt.innerHTML = messageErrorArray[i];
		 		errMsg.appendChild(txt);
	 		}
	 		//Stop Default actions
	 		e.preventDefault();
	 		return false;
 		}else{
	 		//If all is ok, save the data. Send the key value from the edit data function.
	 		//This key value was passed through the editSubmit event listener as a property.
	 		storeData(this.key);
 		}
 		
 		
 	}
 	
 	
 	//Clears local storage
 	function clearLocal() {
 		if(localStorage.length === 0) {
	 		alert("There is nothing to clear!");
 		}else{
	 		localStorage.clear();
	 		alert("All songs have been deleted.");
	 		window.location.reload();
	 		return false;
 		}
 	 }

 	//Variable Defaults
 	var songGenre = ["*Pick A Genre!", "Disco", "Funk", "Classic", "80s", "Hair Metal", "90s Rock"], 
 		learnValue,
 		sitInValue = "No",
 		errMsg = getEl("errors");
 	;
 		
 	createGenres();
 	
 	// Set Link & Submit Click Events
 	var viewList = getEl("viewList");
 	viewList.addEventListener("click", getData);
 	var clearList = getEl("clearList");
 	clearList.addEventListener("click", clearLocal);
 	var addSong = getEl("submitButton");
 	addSong.addEventListener("click", validate);
 	var showRange = getEl("rating");
 	showRange.addEventListener("change", showValue);
 	var learnByDate = getEl("yes");
 	learnByDate.addEventListener("click", toggleMe);
 	var learnByDate2 = getEl("no");
 	learnByDate2.addEventListener("click", toggleMe2);
 	
}); 	