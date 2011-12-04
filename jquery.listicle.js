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

(function () {
  "use strict";
  var $ = jQuery, 
      nullity, 
      isArray,
      buildList,
      animate;

  //Crockford friendly
  nullity = function( thing ){ return thing === undefined || thing === null; };

  //http://ajaxian.com/archives/isarray-why-is-it-so-bloody-hard-to-get-right
  isArray = function( thing ){ return Object.prototype.toString.call(thing) === '[object Array]'; };

  //basic simple animate function as an example
  animate = function( li, destinationUl ){
    li.fadeOut(function(){
      li.appendTo(destinationUl);
      li.fadeIn();
    });
  };

  buildList = function( sourceList, otherList, list ){
    $.each(list, function(index, value){
      var listObject = null, toAppend = $("<li></li>");
      if( typeof(value) === "string" ){ listObject = { id : value, text : value }; }
      else{ listObject = value; }

      toAppend.attr("id", "listicleElement-" + listObject.id);
      toAppend.text(listObject.text);
      sourceList.append(toAppend);
    });

    sourceList.find("li").click(function(){
      //'move' the thing
      animate($(this), otherList);
    });
  };


  $.fn.listicle = function(list1, list2){
    var root = $(this), list1Element, list2Element;

    //setup, clear this out
    root.empty();

    //basic usage checks
    if( nullity(list1) || nullity(list2) ){ throw "Neither lists can be nullish, both must be present" ;}
    if( !isArray(list1) || !isArray(list2) ){ throw "Both lists must actually be arrays."; }
    
    //setup lists
    root.append($("<ul></ul>").addClass("listicle-list1").addClass("listicle"));
    list1Element = root.find(".listicle-list1");    

    root.append($("<ul></ul>").addClass("listicle-list2").addClass("listicle"));
    list2Element = root.find(".listicle-list2");

    buildList(list1Element, list2Element, list1);
    buildList(list2Element, list1Element, list2);

  };
}());
