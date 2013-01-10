(function ($) {
	var methods = {
		init : function(options){
			
			// Define those funky variables
			var editable = $(this);
			var editableMaxHeight = (($(window).height()/2)-70);
			var wrapper = $("#wrapper-of-elegance");
			var innerWrapper = $("#container-of-peace");
			var tooltip  = $("#sweetness-tooltip");
			var tooltipInner = $('div', tooltip);
			var tooltipInnerP = $('p', tooltipInner);
			var footer = $("#footer-of-discovery");
			var length;
			var freshTooltip;
			
			// Disable editing the field until initial animations are finished
			$('div', editable).attr('contenteditable','false');
			
			// Do the initial fade animations
			wrapper.fadeIn(600, function(){
				tooltip.animate({
					opacity: '1',
					marginTop: '-78px'
				}, 500, function(){
					tooltipInner.animate({
						opacity: '1'
					}, 800, function(){
						$('div', editable).attr('contenteditable','true');
						footer.fadeIn(300);
					});
				});
			});
			
			// Set max-height for textarea
			editable.css('max-height',editableMaxHeight);
			
			// Set max-height for textarea depending on window size
			$(window).resize(function(){
				editableMaxHeight = ($(window).height()/2);
				editable.css('max-height',editableMaxHeight);
			});
			
			// Hide custom placeholder on textarea click
			editable.one("click", function(){
				$('div', $(this)).empty();
				$('div', $(this)).focus();
			});
			
			// Add active on textarea focus
			$('div', $(this)).focus(function(){
				editable.addClass('active');
			});
			
			// Remove active on textarea blur
			$('div', $(this)).blur(function(){
				editable.removeClass('active');
			});
			
			// Tooltip animation
			function animateTooltip(tooltip) {
				freshTooltip = tooltip.clone();
				tooltipInner = $('div', freshTooltip);
				tooltipInnerP = $('p', tooltipInner);
				
				tooltip.animate({
					opacity: '0',
					marginTop: '-=500px'
				}, 500, function(){
					tooltip.remove();
					
					freshTooltip.css({
						marginTop: '-24px',
						opacity: '0'
					}).prependTo(innerWrapper).animate({
						opacity: '1',
						marginTop: '-78px'
					}, 600, function(){
						tooltip = freshTooltip;
					});
				});
			}
			
			// Change content and animate tooltips on propertychange
			var firstInterval = true;
			editable.on('input propertychange', function(){
				length = $('div', editable).text().length;
				if(length > 0 && firstInterval) {
					animateTooltip($("#sweetness-tooltip"));
					
					tooltipInnerP.html('Ok, so that\'s <span class="count">'+length+'</span> characters so far.');
					firstInterval = false;
				}
				else if(length > 0 && !firstInterval) {
					tooltipInnerP.html('Ok, so that\'s <span class="count">'+length+'</span> characters so far.');
				}
				else {
					animateTooltip($("#sweetness-tooltip"));	
					tooltipInnerP.html('Alright, ready to count some more letters?');
					firstInterval = true;
				}
			});
			
		}
	};
	    
	$.fn.lettercountin = function ( method ) {
	
		if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.lettercountin' );
        }
		
	}
})(jQuery);