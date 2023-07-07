<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<title>Создание формы обратной связи</title>
<!--<meta http-equiv="Refresh" content="2; URL=/thanks.html"> -->
<meta http-equiv="Refresh" content="2; URL=/"> 
</head>
<body>

<?php 
// 
function writeToLog($data, $title = '')
{
    $log = "\n------------------------\n";
    $log .= date("Y.m.d G:i:s") . "\n";
    $log .= (strlen($title) > 0 ? $title : 'DEBUG') . "\n";
    $log .= print_r($data, 1);
    $log .= "\n------------------------\n";
    file_put_contents(getcwd() . '/hook.log', $log, FILE_APPEND);
    return true;
    echo "succes";
}
$defaults = array('TITLE' => '', 'NAME' => '', 'PHONE' => '', 'COMMENTS' => '', 'EMAIL' => '');
$defaults = $_REQUEST;
$utm = '';
    writeToLog($_REQUEST, 'webform PHP');



    $queryUrl = 'https://geleon.bitrix24.eu/rest/1/hejofpo86ze8v6f8/crm.lead.add.json';
    // Формируем параметры для создания лида в переменной $queryData
  
  $queryData = http_build_query(array(
    'fields' => array(
      // Устанавливаем название для заголовка лида 1578
      'TITLE' => $_POST['title'] . ' Сайт: https://remmat.geleon.ua',
      'NAME' => $_POST['InputNameField'], 
      'ASSIGNED_BY_ID' => 1,
      'UTM_CAMPAIGN' => $_POST['utm_campaign'],
      'UTM_MEDIUM' => $_POST['utm_medium'],
      'UTM_SOURCE' => $_POST['utm_source'],
      'UTM_CONTENT' => $_POST['utm_content'],
      'UTM_TERM' => $_POST['utm_term'],
      'PHONE' => array(array("VALUE" =>  substr($_POST['telephone'], 3), "VALUE_TYPE" => "WORK" )),
     // 'EMAIL' => array(array("VALUE" => $_POST['email']??0, "VALUE_TYPE" => "WORK" )),
      'COMMENTS' => $_POST['message']??0,
  
    ),
    "PHONE" => array(
      array(
        "VALUE" =>  substr($_POST['telephone'],3),
        "VALUE_TYPE" => "WORK"
      )
    ),
    'params' => array("REGISTER_SONET_EVENT" => "Y")
    ));


 
    // Обращаемся к Битрикс24 при помощи функции curl_exec
    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_SSL_VERIFYPEER => 0,
      CURLOPT_POST => 1,
      CURLOPT_HEADER => 0,
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_URL => $queryUrl,
      CURLOPT_POSTFIELDS => $queryData,
    ));
    $result = curl_exec($curl);
    curl_close($curl);
    $result = json_decode($result, 1);   
    writeToLog($result, 'webform result');
  if (array_key_exists('error', $result)) echo "! Ошибка при сохранении лида: ".$result['error_description']."<br/>";

  

$sendto   = "geleon.kl@gmail.com"; // почта, на которую будет приходить письмо shulga.alg@gmail.com
$username = $_POST['InputNameField'];   // сохраняем в переменную данные полученные из поля c именем
$usertel =  substr($_POST['telephone'], 3); // сохраняем в переменную данные полученные из поля c телефонным номером

// Формирование заголовка письма
$subject  = "Заявка с remmat.geleon.ua";
$headers  = "From: remmat@geleon.ua \r\n"; /* . strip_tags($usermail) . "\r\n"; */

// Формирование тела письма
$msg = "Заявка с remmat.geleon.ua\r\n";
$msg .= "От кого: ".$username."\r\n";
$msg .= "Телефон: ".$usertel."\r\n";


// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
  // echo "<center><img src='img/thanks.png'></center>";
  echo "<center><img src='./assets/thanks.png'></center>";
} else {
  // echo "<center><img src='images/ne-otpravleno.png'></center>";
  echo "<center><img src='./assets/ne-otpravleno.svg'></center>";
}

?>

</body>
</html>