<?php
$svg = '<object class="svg" height="50px" type="image/svg+xml" data="'.STYLEDIR.'/assets/img/sonisk-o.svg" class="logo"></object>';
$bg = get_the_post_thumbnail_url();
?>

<input class="themeDir" type="hidden" value="<?php echo get_stylesheet_directory_uri(); ?>"/>

<section id="hero" class="vh">
  <div class="hero-bg" <?php if($bg) : echo 'style="background-image:url('.$bg.')"'; endif; ?>></div>
  <div class="container">
    <div class="content">
    <?php
    $h = get_field('hero_headline');
    $img = get_field('logo_image');
    if($h) :
      echo '<h1 style="margin-bottom:10px">'.$h.'</h1>';
      else :
      echo '<h1>Placeholder Headline</h1>';
      endif;
      if($img) :
        echo '<img src="'.$img.'"/><br><br>';
      endif;
      $sub = get_field('sub_headline');
      if($sub) :
        echo '<h2>'.$sub.'</h2>';
        else :
        echo '<h2>Placeholder Sub-Headline Here</h2>';
        endif;
      ?>
    <?php signup_form(); ?>
  </div>
  </div>
  <a href="#about" class="scroll-down">Learn More</a>
</section>
