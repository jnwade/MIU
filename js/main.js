$('#home').on('pageinit', function(){
	//code needed for home page goes here
	
	
});	

		
$('#additem').on('pageinit', function(){

		var rlForm = $('#mainForm');
		    rlForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var key = rlForm.serializeArray();
			storeData(key);
			
		}
	});
	
	//getElementByID Function
 	function getEl(x){
 		var theElement = document.getElementById(x);
 		return theElement;
 	}

	
	//Find Value of selected radio button
	function getSliderValue(){
		var slider = document.forms[0].learn;
			for(var i=0; i<slider.length; i++){
				if(slider[i].checked){
					learnValue = slider[i].value;
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

	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
		//Actual json object data required for this to work is coming from our json.js file which is loaded from our HTML page.
	 	//Store json object into local storage.
	 	for(var n in json){
		 	var id = Math.floor(Math.random()*1000001);
		 	localStorage.setItem(id, JSON.stringify(json[n]));
	 	}

	 
};

var getData = function(){
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
};

var storeData = function(key){
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
		getSliderValue();
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
	
}; 

var	deleteItem = function (){
	var ask = confirm("Delete Song?");
	 	if(ask) {
		 	localStorage.removeItem(this.key);
		 	window.location.reload();
	 	}else{
		 	alert("Whew, that was a close one!");
		 	
	 	}

			
};
					
var clearLocal = function(){
	if(localStorage.length === 0) {
	 		alert("There is nothing to clear!");
 		}else{
	 		localStorage.clear();
	 		alert("All songs have been deleted.");
	 		window.location.reload();
	 		return false;
 		}
};


