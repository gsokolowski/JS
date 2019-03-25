lightbox
========

The Responsive Javascript LightBox

This was a quick 2-hour project to teach myself a little bit more javascript. There are numerous lightboxes around, but I wanted to code my own for fun.

The lightbox works quite simply. Here's how to launch it:
<ul>
<li>It's launched with a <button> element. Give it any class you like, and any id you like. In this example, we'll give it '#THIS'.</li>
<li>Create a div with the classes "hidden modal" (see the css in the source to see what these classes do)</li>
<li>The new div should also have the same #id as your button, with "-modal" on the end. So in our example, the div's id is '#THIS-modal'</li>
<li>Put whatever you like in the div. An image, another div, an iframe, a gallery, should all work fine.</li>
</ul>
When you launch the lightbox, the script tests the document.body's window size as well as the lightbox div's size and positions it in the centre of the document. I've used percentage ratios, so you can resize the window and the div stays in the middle.
