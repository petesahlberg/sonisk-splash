<?php // Hooks

function sonisk_homepage() {
	get_template_part('modules/hero');
	get_template_part('modules/about');
	get_template_part('modules/features');
}

add_action("before_content","sonisk_homepage");
