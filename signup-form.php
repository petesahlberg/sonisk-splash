<?php echo the_field('hero_form_description'); ?>
<form class="sonisk-signup" method="POST" action="<?php echo STYLEDIR.'/signup.php'; ?>">
	<input autocomplete="off" id="mc-email" mailer="email" name="email_address" type='email' placeholder="EMAIL ADDRESS" required/>
	 <input class="hidden" type="text" value="subscribed" id="status" name="status" hidden/>
	<button type='submit' value="Sign Up"/><span>Sign Up</span></button>
</form>
