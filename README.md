**Listicle jQuery List Shuffle Thing**
===

This has nothing to do with Lists and Articles.

Often I've needed to write something that lets a user move
something between two lists. This comes up often in the
Enterprise it seems.

This is a little plugin that provides something that
builds two *ul* things. Clicking on an element in
one list calls an animation function which moves
the thing from one list to the other. Optionally
with a callback to make an AJAX call or something.

That's about it.

See the samples folder for a couple of simple examples

Default 'animateFunction' is a fadeOut/fadeIn in the two lists.
Default 'pushFunction' if you provide a URL is to 
$.get(url, {id : idOfObject, list : itemMovingToFirstList ? 1 : 2});

If you provide your own pushFunction, you can pretty much do what you want, url
is not needed.

**Usage**

	var list1 = ["Bob", "Mike", "Tim"];
	var list2 = [];
	var options = {
		url : "your.example.com/callback",
		animateFunction : function(){},
		pushFunction : function(url, clickedID, listId ){}
	};
    $("#someDiv").listicle(list1, list2, options);
