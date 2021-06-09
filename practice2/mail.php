<?php

$name=$_POST('name');
$emailid=$_POST('email');
$pref=$_POST('dropdown1');
$days=$_POST('dropdown2');
$meal=$_POST('dropdown3');


if(empty($name) || empty($emailid) || empty($pref) || empty($days) || empty($meal))
{
    echo "Please fill all fields";
}
else{
    mail($emailid,"Online order"," your details");
    echo "<script type='text/javascript'>alert('your message sent succesfully</script>";
}

?>
