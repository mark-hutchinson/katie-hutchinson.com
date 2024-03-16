<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
require 'env.php';

if (isset($_SERVER['HTTP_ORIGIN'])) {
//     header("Access-Control-Allow-Origin: http://localhost:3001");
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);
    if (is_null($data)) {
        http_response_code(400);
        echo "Invalid JSON";
        exit;
    }

    $name = strip_tags(trim($data["name"]));
    $name = str_replace(array("\r","\n"), array(" "," "), $name);
    $from = filter_var(trim($data["fromEmail"]), FILTER_SANITIZE_EMAIL);
    $message = trim($data["message"]);

    if ( empty($name) OR empty($message) OR !filter_var($from, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Oops! There was a problem with your submission. Please complete the form and try again.";
        exit;
    }

    $mail = new PHPMailer(true);
    try {
        //Server settings
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.dreamhost.com';                   //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = $sender_email;                          //SMTP username
        $mail->Password   = $sender_email_password;                 //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom($sender_email, 'Mailer');
        $mail->addAddress($recipient_email, 'Katie Hutchinson');     //Add a recipient
        $mail->addReplyTo($from, $name);

        //Content
        $mail->isHTML(false);
        $mail->Subject = "Contact from $name on katie-hutchinson.com";
        $mail->Body    = "Name: $name\nEmail: $from\n\nMessage: $message\n";

        $mail->send();
        http_response_code(200);
        echo 'Message has been sent';
    } catch (Exception $e) {
        http_response_code(500);
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>