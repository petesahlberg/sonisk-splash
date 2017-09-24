<?php

//fill in these values for with your own information
$api_key = 'e31a7ffa1a06e7d98fb0731397e11a63-us16';
$datacenter = 'us16';
$list_id = '43595c2ab4';

$email = $_POST['email_address'];
$status = 'subscribed';


$url = 'https://us16.api.mailchimp.com/3.0/lists/43595c2ab4/members/';
$url = 'https://'.$datacenter.'.api.mailchimp.com/3.0/lists/'.$list_id.'/members/';

$username = 'apikey';
$password = $api_key;

$data = array("email_address" => $email,"status" => $status);
$data_string = json_encode($data);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_USERPWD, "$username:$api_key");
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data_string))
);

$result=curl_exec ($ch);
curl_close ($ch);

echo $result;

?>
