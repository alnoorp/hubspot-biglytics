/* This script simply changes the data attribute 'selected',
but doesn't handle any animation. All animation is done in CSS. 
If the target element's 'data-sync' attribute is true, only
one accordion can be opened at a time. */

function buildAccordion(el) {
    
    var accordion = el,
        accordionItems = accordion.children,
        oneAtTime = accordion.getAttribute('data-sync'),
        hideAllItems = function(ex) {
            /* Loop through all items and hide them */
            Array.prototype.forEach.call(accordionItems, function(el, i){
                if (el != ex) {
                    el.setAttribute('aria-expanded', 'false')
                }
            });
        },
        toggleItem = function(el) {
            /* Toggle whether item is selected or not */
            if (el.getAttribute('aria-expanded') == 'true') {
                el.setAttribute('aria-expanded', 'false');
            }
            else {
                el.setAttribute('aria-expanded', 'true');
            }
        },
        clickBind = function() {
            accordion.addEventListener('click', function(e) {
            	if(e.target && e.target.nodeName == "BUTTON") {
            		/* Should only 1 item show? */
            		if (oneAtTime) {
            		    hideAllItems(e.target.parentNode);
            		}
            		/* Toggle the item */
            		toggleItem(e.target.parentNode);
            	}
            });
        },
        /* Go time */
        init = (function() {
            clickBind();
        })();
}

var accordions = document.querySelectorAll('.accordion');
Array.prototype.forEach.call(accordions, function(el){
    buildAccordion(el);     /* Find all instances of '.hs-accordion' and initialize for each of them */
});