/*
 * @package ezbox
 * @version 0.1
 * @author Richard Denton / eMarketeer Australia
 * @license
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013 Richard Denton / eMarketeer Australia (emarketeer.com.au)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
$(document).ready(function(){
	
	//Append all of our lightbox html/css structure.
	$(document.body).append('<div id="ezbox-lightbox" class="ezbox-lightbox"><div id="ezbox-loading" class="ezbox-loading"></div><div id="ezbox-image-wrapper" class="ezbox-image-wrapper"><div id="ezbox-close" class="ezbox-close"></div><img src="" alt="" id="ezbox-image" class="ezbox-image" /></div></div>');
	
	ezbox_img = null;
	ezbox_status = 0;
	
	//Create hooks.
	$("[data-rel=ezbox]").click(function(e){
		//Prevent default linking.
		e.preventDefault();
		//Call the lightbox function.
		ezbox_bootstrap(this.href);
	});
	
	$("#ezbox-lightbox").click(function(){
		//Escape the lightbox.
		ezbox_escape();
	});
	
	$("#ezbox-image").click(function(e){
		e.stopPropagation();
	});
	
	$(window).resize(function(){
		ezbox_escape();
	});
	
	function ezbox_bootstrap(s_url) {

		if ( window.ezbox_status != 0 ) {
			//Cancel until current lightbox closes.
			return false;
		}
		
		//Hide elements in case of previous lightbox appearence.
		$("#ezbox-image-wrapper").hide();
		$("#ezbox-image").attr("src","");
		
		//Load the loading screen.
		$("#ezbox-loading").show();
		$("#ezbox-lightbox").fadeIn(250);
		
		//Set the loading status.
		window.ezbox_status = 1;
		
		//Load the image.
		ezbox_img = new Image();
		ezbox_img.src = s_url;
		ezbox_img.onload = function() {
			//Once the image has loaded, create the lightbox.
			ezbox_create(s_url, ezbox_img);
		}
		
	}
	
	function ezbox_create(s_url, oImg) {
		
		//Fade out the loading screen.
		$("#ezbox-loading").fadeOut(250, function(){
			
			//Ensure old CSS is stripped.
			$("#ezbox-image").css("width", "");
			$("#ezbox-image").css("height", "");
			
			//Get the window dimensions.
			var ezbox_img_width = oImg.width;
			var ezbox_img_height= oImg.height;
			var ezbox_window_height = $(window).height();
			var ezbox_window_width = $(window).width();
			var ezbox_window_height_shrink = (ezbox_window_height / 100) * 90;
			var ezbox_window_width_shrink = (ezbox_window_width / 100) * 90;
			var ezbox_width_diff = oImg.width - ezbox_window_width_shrink;
			var ezbox_height_diff = oImg.height - ezbox_window_height_shrink;
			
			//Check to see if the image is bigger than the browser window. If it is, shrink it.
			if ( oImg.width >= ezbox_window_width || oImg.height >= ezbox_window_height ) {
				
				//Find the higher difference scale.
				if ( ezbox_width_diff > ezbox_height_diff ) {
					//Shrink the width
					$("#ezbox-image").css("width", ezbox_window_width_shrink+"px");
					ezbox_img_width = ezbox_window_width_shrink;
					
					//Work out the new height.
					ezbox_scale = (ezbox_window_width_shrink / oImg.width) * 100;
					ezbox_img_height = (ezbox_img_height / 100) * ezbox_scale;
					
				} else {
					//Shrink the height
					$("#ezbox-image").css("height", ezbox_window_height_shrink+"px");
					ezbox_img_height = ezbox_window_height_shrink;
					
					//Work out the new width.
					ezbox_scale = (ezbox_window_height_shrink / oImg.height) * 100;
					ezbox_img_width = (ezbox_img_width / 100) * ezbox_scale;
				}
				
			}
			
			//Get the image dimensions.
			var img_margin_left = (ezbox_img_width/2)+10;
			var img_margin_top = (ezbox_img_height/2)+10;
			
			//Set the margins.
			$("#ezbox-image-wrapper").css("margin-left", "-"+img_margin_left+"px");
			$("#ezbox-image-wrapper").css("margin-top", "-"+img_margin_top+"px");
			
			//Show the image.
			$("#ezbox-image").attr("src", oImg.src);
			$("#ezbox-image-wrapper").fadeIn(250);			
			
			window.ezbox_status = 2;
			
		});
	}
	
	function ezbox_escape() {
		
		if ( window.ezbox_status != 0 ) {
			//Escape the window.
			$("#ezbox-lightbox").fadeOut(250, function(){
				window.ezbox_status = 0;
			});
		}
		
	}
	
});