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
	
	//Toggles the date field depending on the "Need to Learn" radio button selection
	/*
function toggleMe(){
		getEl("learnByDate").style.display="block";		
	}
	
 
	function toggleMe2(){
			getEl("learnByDate").style.display="none";
			getEl("learnBy").value="";
				
	}
*/
	
	
//Find Value of selected slider button
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

	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};