<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once("./../lib/PHPMailer/src/PHPMailer.php");
require_once("./../lib/PHPMailer/src/Exception.php");
require_once("./../lib/PHPMailer/src/SMTP.php");

require_once 'middlewares/allowCors.php';
include 'database.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$username = $request->username;
$nombre = $request->nombre;
$apellidos = $request->apellidos;
$role = "usuario";
$password = $request->password;

$to = $username;

$newToken = bin2hex(random_bytes(8));
$hashedPassword = hash('sha256', $password);

// Verificar si ya existe un usuario con el mismo username
$consulta_verificacion = "SELECT COUNT(*) AS num_usuarios FROM usuarios WHERE username = ?";
$stmt_verificacion = $con->prepare($consulta_verificacion);
$stmt_verificacion->bind_param('s', $username);
$stmt_verificacion->execute();
$resultado_verificacion = $stmt_verificacion->get_result();
$fila_verificacion = $resultado_verificacion->fetch_assoc();

if ($fila_verificacion['num_usuarios'] > 0) {
    echo json_encode(['success' => false, 'error' => 'Ya existe un usuario con el mismo username']);
    exit;
}

// Insertar el nuevo proyecto en la base de datos
$consulta = "INSERT INTO usuarios (username, password, nombre, apellidos, role, token) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $con->prepare($consulta);
$stmt->bind_param('ssssss', $username, $hashedPassword, $nombre, $apellidos, $role, $newToken);

if ($stmt->execute()) {
    sendEmail($to, $username, $password);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
}

function generarContrasena($longitud = 10) {
    $caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_';
    $longitud_caracteres = strlen($caracteres);
    $contrasena = '';
    for ($i = 0; $i < $longitud; $i++) {
        $contrasena .= $caracteres[rand(0, $longitud_caracteres - 1)];
    }
    return $contrasena;
}

function sendEmail($to, $username, $password) {
    try {
        $subject = "Bienvenid@ a FinazApp";

        $html_message = file_get_contents("./../assets/template/registrarUserEmail.html");
        $html_message = str_replace("[username]", $username, $html_message);
        $html_message = str_replace("[password]", $password, $html_message);

        $remitente = 'arturolopez1997vecino@gmail.com';
        $nremitente = 'GestionProyectos';

        $mail = new PHPMailer(true);

        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPAuth = true;
        $mail->Username = 'arturolopez1997vecino@gmail.com';
        $mail->Password = 'jcivdngndtyspzrz';
        $mail->SMTPSecure = 'tls';
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->SMTPKeepAlive = true;
        $mail->Timeout = 30;

        $mail->setFrom($remitente, $nremitente);
        $mail->addReplyTo($remitente, $nremitente);
        $mail->addAddress($to);
        $mail->isHTML(true);

        $mail->Subject = $subject;
        $mail->Body = $html_message;

        if ($mail->send()) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(array("error" => "Error al enviar el correo electrónico. $to"));
        }
    } catch (Exception $e) {
        echo "Error al enviar el correo: {$mail->ErrorInfo}";
    }
}

$con->close();
?>
