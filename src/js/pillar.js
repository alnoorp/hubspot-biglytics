/*

Anchor Content

Usage:

1. Link to JS
2. Add required CSS, mod classes if necessary
3. Markup doc as described below
4. Instantiate with optional configuration items as described below


Markup Requirements:

This module requires a container with a navigation section and any number of content sections. Classes are necessary, but can be overridden with the config options as described in the instantiation section of these instructions. Below is some pseudo code to illustrate the markup requirements. 

	<element class="anchor-content-container">

		<nav class="anchor-nav">
			<ul class="nav-items">[KEEP THIS EMPTY]</ul>
		</nav>

		<element class="anchor-content-section">
			<element class="anchor-content-section-title" data-section-title-clean="title_of_this_section_to_be_used_as_anchor_link">Title Of This Section Which Will Be Used As Anchor Link Text</element>

			<element class="anchor-content-section-title" data-section-title-clean="title_of_this_section_to_be_used_as_anchor_link">Title Of This Section Which Will Be Used As Anchor Link Text</element>

			<element class="anchor-content-section-title" data-section-title-clean="title_of_this_section_to_be_used_as_anchor_link">Title Of This Section Which Will Be Used As Anchor Link Text</element>
		</element>

	</element>

Instantiation and Configuration Options:

If you only have one occurance of anchor nav on a page (which is likely the case), and do not
wish to use any custom configurations; you can simply instantiate an instance of anchor_content like so:

	new anchor_content(anchor-content-container);

If you have or may have multiple occurances of anchor nav, you can use a loop to instantiate multiple
instances:

	$(anchor-content-containers).each(function(){
		new anchor_content($(this));	
	})

If you'd like to override any of the default config options, here are all the available properties, their defaults,
and the syntax for using them:

	new anchor_content(anchor-content-container, {
		nav_class                   : '.anchor-nav',
	    nav_ul_class                : '.nav-items',
	    section_container_class     : '.anchor-content-section',
	    section_title_class         : '.anchor-content-section-title',
	    nav_selected_class          : 'selected',
	    nav_show_hide_btn_class     : '.anchor-nav-show-hide',
	    one_col_breakpoint          : 768,
	    nav_click_scroll_time       : 700,
	    selected_section_offset     : 100
	});

Most of these should be pretty self explanatory, with the exception of selected_section_offset. This property allows you to specify when a section should be considered selected during scrolling. If it is set to zero, the section will be considered selected when the top of the section is exactly aligned with the top of the window. If it is set to 100 (the default), the section will be considered selected when the top of the section is 100 pixels from the top of the window. Adjusting this can be helpful for massaging Anchor Nav to specific designs. 

*/

var anchor_content = function(_container, options) {
  var container = _container;
  //default config values
  var config = {
      nav_class                   : '.pillar-navigation',
      nav_ul_class                : '.pillar-navigation__menu',
      section_container_class     : '.pillar-section',
      section_title_class         : '.pillar-section__title',
      nav_selected_class          : '.selected',
      nav_show_hide_btn_class     : '.anchor-nav-show-hide',
      one_col_breakpoint          : 768,f
      nav_click_scroll_time       : 700,
      selected_section_offset     : 100
  };
  //replace defaults if necessary
  for (var prop in options) {
      if (options.hasOwnProperty(prop)) {
          config[prop] = options[prop];
      }
  }
  //utility functions
  var requiredElement = function(class_name) {
          if (container.find(class_name).length < 1) {
              //if a required element doesn't exist, quit trying to build anchor content and throw error
              throw new Error("Anchor content JS couldn't find an element with the class '" + class_name + "'");
              return false;
          } else {
              return class_name;
          }
      },
      distinctValues = function(arr){
          for (var i = 0; i < arr.length-1; i++) {
              for (var j = i+1; j < arr.length; j++) {
                   if (arr[i] == arr[j]) {
                       return false;
                   }
              }
          }              
          return true;          
      };

  //private properties of anchor content

  var nav                             = container.find(requiredElement(config.nav_class)),
      original_nav_offset             = nav.offset().top,
      sections                        = container.find(requiredElement(config.section_container_class)),
      section_title_class             = container.find(requiredElement(config.section_title_class)),
      current_container_height        = container.height(),
      bottom_of_container             = current_container_height + container.offset().top,
      container_minus_nav             = '',
      nav_built                       = false,
      section_waypoints               = [],
      section_waypoints_by_offset     = {},
      section_waypoints_by_name       = {},
      current_waypoint                = '',
      waypoint_freeze                 = false,
      history_freeze                  = false;         

  //private methods of anchor content
  var buildSections = function(){

          //validate sections (make sure titles are distinct)
          var validateSections = [];
          sections.each(function() {
              validateSections.push($(this).children(section_title_class).attr('data-section-title-clean'));
          });
          if(distinctValues(validateSections)){
              sections.each(function(){
                  buildSection($(this));
              })
          }else{
              //if titles aren't distinct, append them all with increment
              sections.each(function(i){
                  $(this).children(section_title_class).attr('data-section-title-clean', function(j, val){
                      return val + '_' + i;
                  }),
                  buildSection($(this));
              })
          }

          //now that nav exists, get the value of the container less the nav
          container_minus_nav = bottom_of_container - nav.outerHeight();
          nav_built = true;
      },
      buildSection = function(this_section){
          var title = this_section.children(section_title_class).html(),
              title_snake = this_section.children(section_title_class).attr('data-section-title-clean'),
              this_top = this_section.offset().top;

          this_section.attr('id', title_snake);
          if(!nav_built) addNavItem(title, title_snake);
          section_waypoints.push(this_top);
          section_waypoints_by_offset[this_top] = title_snake;
          section_waypoints_by_name[title_snake] = this_top;
      },
      addNavItem = function(title, title_snake) {
          nav.find('ul'+config.nav_ul_class).append('<li><a href=#' + title_snake + '>' + title + '</a></li>');
      },
      scrolling = function() {
          //fix nav if it reaches top of screen           
          if ($(window).scrollTop() > original_nav_offset) {
              nav.addClass('fixed'); 
              //leave nav at bottom of container if scrolling past container  
              if(container.height() != current_container_height){
                  current_container_height = container.height();
                  bottom_of_container      = current_container_height + container.offset().top;
                  container_minus_nav = bottom_of_container - nav.outerHeight();
                  section_waypoints = [];
                  sections.each(function(){
                      buildSection($(this));
                  });
              }
              if ($(window).scrollTop() > container_minus_nav){
                  nav
                      .removeClass('fixed')
                      .addClass('absolute-bottom');
              }else{
                  nav
                      .removeClass('absolute-bottom')
                      .addClass('fixed');
              }
          } else {
              nav.removeClass('fixed');
          }
          findNavWaypoint($(window).scrollTop());           
      },
      findNavWaypoint = function(this_scroll_top) {
          if(!waypoint_freeze){
              for (var i = 0; i < section_waypoints.length; i++) {
                  //switch nav when a section is at top of window minus section offset
                  if (Math.abs((section_waypoints[i] - this_scroll_top) - config.selected_section_offset) <= config.selected_section_offset) {
                      if(section_waypoints[i] != current_waypoint){
                          switchNavSelection(section_waypoints[i]);
                      }
                  }
              }
          }
      },
      switchNavSelection = function(key) {
          current_waypoint = key;
          nav.find('li').removeClass(config.nav_selected_class);
          nav.find('a[href=#' + section_waypoints_by_offset[key] + ']').parent('li').addClass(config.nav_selected_class);
          if(!history_freeze){
              history.pushState(null, null, '#'+section_waypoints_by_offset[key]);
          }
      },
      navClickScroll = function(e) {
          e.preventDefault();
          nav.removeClass('open');
          scrollWithoutWaypoints($(this).attr('href'));
      },
      scrollWithoutWaypoints = function(id){
          var page = $('html, body');

          waypoint_freeze = true;

          page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
              waypoint_freeze = false;
              page.stop();
              findNavWaypoint($(window).scrollTop());
         });

          page.animate({
              scrollTop: ($(id).offset().top - config.selected_section_offset)
              //scrollTop: $(id).offset().top
          }, config.nav_click_scroll_time, function(){
              page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
              waypoint_freeze = false;
              findNavWaypoint($(window).scrollTop());
              history_freeze = false;
          });
      },
      navigateFromURL = function(){
          switchNavSelection(section_waypoints_by_name[location.hash.substring(1)]);
      },
      init = (function() {

          buildSections();

          if(location.hash){
              navigateFromURL();
          }
          
          window.onpopstate = function(){
              history_freeze = true;
              scrollWithoutWaypoints(location.hash);
          }

          $(window).on('scroll', scrolling);

          nav.on( "click", "a", navClickScroll);
          nav.on( "click", config.nav_show_hide_btn_class, function(){nav.toggleClass('open')});
      })();
}