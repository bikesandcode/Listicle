/*!
 * listicle jQuery plugin v0.1
 *
 * License : GPL v3 or at your discretion, any later license.
 * See included license.txt, or 
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * Usage:
 * $(selector).listicle( list1, list2 );
 * 
 * list1, list2 : Elements are either strings, or {id : "key", text : "List Text"}
 * empty arrays should be used to indicate nothing in one <ul> or the other.
 */

/*jslint devel: true, browser: true, white: true, maxerr: 50, indent: 2, unparam: true */
/*global jQuery : false, $ : false */

//(function () {
  "use strict";
  var $ = jQuery, 
      nullity, 
      isArray,
      removeById,
      buildList,
      animate,
      idIfy,
      unIdIfy,
      handleInputList,
      firstList = [], secondList = [];

  //Crockford friendly
  nullity = function( thing ){ return thing === undefined || thing === null; };

  //http://ajaxian.com/archives/isarray-why-is-it-so-bloody-hard-to-get-right
  isArray = function( thing ){ return Object.prototype.toString.call(thing) === '[object Array]'; };
  
  //Turn a string into an id to be used in the lists.
  idIfy = function( string ){ return "listicleElement-" + string;};  
  
  //and convert back to the actual 'id' of the element
  unIdIfy = function( idString ){ return idString.substr("listicleElement-".length); };
  
  //remove from the provided list given the id property
  removeById = function( array, id ){
    var foundAt = -1;
    $.each(array, function(index){ 
      if( array[index].id === id ){ foundAt = index; }
    });
    
    return array.splice(foundAt, 1);
  };

  //basic simple animate function as an example
  animate = function( li, destinationUl ){
    li.fadeOut(function(){
      li.appendTo(destinationUl);
      li.fadeIn();
    });
  };

  buildList = function( listUl, objectList ){
    $.each(objectList, function(index, value){
      var toAppend = $("<li></li>");
      toAppend.attr("id", idIfy(value.id));
      toAppend.text(value.text);
      listUl.append(toAppend);
    });
  };

  handleInputList = function( input ){
    var destination = [];
    $.each(input, function(index, value){
      var listObject = null;
      if( typeof(value) === "string" ){ listObject = { id : value, text : value }; }
      else{ listObject = value; }
      destination.push(listObject);
    });
    return destination;
  };

  $.fn.listicle = function(list1, list2){
    var root = $(this), list1Element, list2Element;

    //setup, clear this out
    root.empty();

    //basic usage checks
    if( nullity(list1) || nullity(list2) ){ throw "Neither lists can be nullish, both must be present" ;}
    if( !isArray(list1) || !isArray(list2) ){ throw "Both lists must actually be arrays."; }

    //setup data
    firstList = handleInputList( list1 );
    secondList = handleInputList( list2 );
    
    //setup lists
    root.append($("<ul></ul>").addClass("listicle-firstList").addClass("listicle"));
    list1Element = root.find(".listicle-firstList");    

    root.append($("<ul></ul>").addClass("listicle-secondList").addClass("listicle"));
    list2Element = root.find(".listicle-secondList");

    buildList(list1Element, firstList);
    buildList(list2Element, secondList);
    
    root.find("li").click(function(){
      var id = $(this).attr("id"),
          inList = secondList,
          otherList = firstList,
          listObject = null;
      
      //find which list it's in
      $.each(firstList, function(index, value){
        if( value.id === unIdIfy(id) ){ 
          inList = firstList; 
          otherList = secondList;
        }
      });
      
      //move it to the other
      listObject = removeById(inList, unIdIfy(id))[0];
      otherList.push(listObject);
      
      //and move the DOM element
      if( inList === firstList ){ animate($(this), $(".listicle-secondList")); }
      else{ animate($(this), $(".listicle-firstList")); }
      
      // Logging for verification and such.
      var list1Out = "", list2Out = "";
      $.each(firstList, function(index, value){list1Out += value.id + ",";});
      $.each(secondList, function(index, value){list2Out += value.id + ",";});
      
      console.info(list1Out);
      console.info(list2Out);
    });
    
  };
//}());
