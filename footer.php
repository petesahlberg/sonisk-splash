<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Pete_Base
 */

?>

	</div><!-- #content -->

	<?php do_action('after_content'); ?>

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="container-nopad">

		<div class="site-info">
			<?php
			if ( function_exists( 'the_custom_logo' ) ) {
				the_custom_logo();
			}
			 echo '<a href="/" class="custom-logo-link"><img class="placeholder-logo" src="'.STYLEDIR.'/assets/img/logo-1.png"/></a>';
		 	?>
				 <!--<a href="mailto:info@sonisk.com">info@sonisk.com</a> -->
				 <?php if ( is_active_sidebar( 'footer_widgets_left' ) ) :
					 		dynamic_sidebar( 'footer_widgets_left' );
					else :
						echo "<p class='placeholder-text'>Footer Widget Area (Left)</p>";
					endif; ?>
			 </div>
			 <div class="footer-form">
				 <br>
					<?php signup_form(); ?>
				</div>
				<!--<div class="social">
			<a href="http://www.facebook.com"><i class="icon ion-social-facebook"></i></a>
		</div> -->
		<?php if ( is_active_sidebar( 'footer_widgets_Right' ) ) :
				 dynamic_sidebar( 'footer_widgets_right' );
				 else :
					 echo "<p class='placeholder-text'>Footer Widget Area (Right)</p>";
				 endif; ?>
	</div>
		</div>
	</footer><!-- #colophon -->
	<div class="sub-footer">
		<div class="container">
		<p>&copy;<?php echo date('Y') ?> <?php echo get_bloginfo('title'); ?></p>
	</div>
	</div>
</div>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
