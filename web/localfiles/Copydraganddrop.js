//Type your code here.


window.addEventListener('load',onWindowLoad );

/**
	 * @function
	 * @name : onWindowLoad
	 * @description : add the drag and drop evenets to the elements 	 
     * @return : null
     */ 
function onWindowLoad (){

  //addition of the events to the DOM elements
  addEventsToElements();
  //calling the Voltmx componet intiatlization function  
  window.setTimeout(function(){
    voltmx.evaluateJavaScriptInNativeContext("_com_voltmxmp_dragandDrop_web_componetontBrowserLoad()");
    //#endif
  },1000);

}

/**
	 * @function
	 * @name : updateDomElements
	 * @description : update the DOM elements with the properties configured 	 
     * @return : null
     */
function updateDomElements(options){
  if(options === undefined || options === null){
    return;
  }
  if(options["browseText".toLowerCase()]!== undefined && options["browseText".toLowerCase()] !== null){
    var value = options["browseText".toLowerCase()];
    //DOM element 
    let browseText_PTag = document.getElementById('browseText');
    browseText_PTag.innerHTML = value;

  }
  if(options["buttonText".toLowerCase()]!== undefined && options["buttonText".toLowerCase()] !== null){
    var value = options["buttonText".toLowerCase()];
    //DOM element 
    let buttonText_PTag = document.getElementById('buttonText');
    buttonText_PTag.innerHTML = value;

  }
}
/**
	 * @function
	 * @name : addEventsToElements
	 * @description : add the drag and drop evenets to the elements 	 
     * @return : null
     */
function addEventsToElements(){
  let dropArea = document.getElementById('drop-area');
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight(e) {
    dropArea.classList.add('highlight');
  }

  function unhighlight(e) {
    dropArea.classList.remove('highlight');
  }

  dropArea.addEventListener('drop', handleDrop, false);
}


function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;
  handleFiles(files);
}


function handleFiles(files){
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileObject = {
      'lastModified'     : file.lastModified,
      'lastModifiedDate' : file.lastModifiedDate,
      'name'             : file.name,
      'size'             : file.size,
      'type'             : file.type
    };
    const read = new FileReader();
    read.readAsDataURL(file);
    read.onloadend = function(){
      fileObject.content = read.result;
      //#ifdef PLATFORM_NATIVE_ANDROID_IOS
      var href = window.location.href.substring(0,4); 
      if(href === 'file' ) {
        var state = [];
        voltmx.evaluateJavaScriptInNativeContext("_com_voltmxmp_dragandDrop_web_componetont_filesDrop", JSON.stringify([fileObject]));
      }else{
        voltmx.evaluateJavaScriptInNativeContext("_com_voltmxmp_dragandDrop_web_componetont_filesDrop("+JSON.stringify(fileObject)+")");
      }
    };
  }  
}
