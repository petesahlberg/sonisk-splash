<?php

//constants

define('STYLEDIR', get_stylesheet_directory_uri());

// site logo
function theme_prefix_setup() {
    add_theme_support( 'custom-logo' );
}
add_action( 'after_setup_theme', 'theme_prefix_setup' );

add_theme_support( 'custom-logo', array(
   'height'      => 175,
   'width'       => 400,
   'flex-width' => true,
) );

add_theme_support( 'custom-logo', array(
   'header-text' => array( 'site-title', 'site-description' ),
) );

// form
function signup_form() {
	get_template_part('signup-form');
}

// footer sidebar
/**
 * Register our sidebars and widgetized areas.
 *
 */
function footer_widgets_init() {

	register_sidebar( array(
		'name'          => 'Footer Widgets Right',
		'id'            => 'footer_widgets_right',
		'before_widget' => '<div>',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="rounded">',
		'after_title'   => '</h2>',
	) );

  register_sidebar( array(
		'name'          => 'Footer Widgets Left',
		'id'            => 'footer_widgets_left',
		'before_widget' => '<div>',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="rounded">',
		'after_title'   => '</h2>',
	) );


}
add_action( 'widgets_init', 'footer_widgets_init' );


add_editor_style('style.css' );

?>
