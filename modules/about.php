<section id="about">
  <div class="container">
    <?php $img = get_field('about_image');
    if($img) : ?>
    <div class="sidebar">
        <img src="<?php echo $img; ?>"/>
    </div>
    <?php endif; ?>
      <div class="site-content">
        <?php
        while ( have_posts() ) : the_post();

        if(get_the_content() != '') :

          get_template_part( 'template-parts/content', 'page' );

          else : ?>

            <h2>Sample <strong>Headline</strong></h2>
            <p>Sample content lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec purus tortor, venenatis id nisi non, dignissim egestas ligula. Praesent scelerisque, libero sed lobortis efficitur, mauris nunc maximus purus, id faucibus mi elit vel tellus. Nullam nec vehicula odio, ut rhoncus nulla.</p>
          <?php endif;

        endwhile; // End of the loop.

        ?>

      <!--  <a class="scroll-down" href="#features">Features</a> -->

      </div>

  </div>
</section>
