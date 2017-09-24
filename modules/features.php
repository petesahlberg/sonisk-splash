<section id="features">
  <div class="container">
    <?php $features = get_field('features');
    if($features) :
      foreach($features as $feature) : ?>
    <!-- feature -->
    <div class="feature">
      <div class="feature-image">
          <img src="<?php echo $feature['feature_image']; ?>"/>
      </div>
      <div class="feature-content">
      <?php echo $feature['feature_content']; ?>
      </div>
    </div>
    <!-- end feature -->
    <?php endforeach;
    else :

      echo '<h6 style="font-weight:bold;font-size:18px;text-align:center">Features Area</h6>
      <p style="text-align:center">Add features in the page editor.</p>';

    endif; ?>

    </div>
    <!-- end feature -->
  </div>
</section>
