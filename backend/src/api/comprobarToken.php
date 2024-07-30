<?php
include 'database.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token = $request->token;
$password = $request->password;

// Consulta para verificar si el token coincide en la tabla de usuarios
$consulta1 = "SELECT token FROM usuarios WHERE token = ?";
$stmt1 = $con->prepare($consulta1);
$stmt1->bind_param('s', $token);
$stmt1->execute();
$resultado1 = $stmt1->get_result();

if (!$resultado1) {
    echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
    exit; // Terminar la ejecución si hay un error en la consulta
}

$hashed_password = hash('sha256', $password);

// Verificar si se encontró un token correspondiente
if ($resultado1->num_rows == 1) {
    // Actualizar el campo password en la tabla de usuarios
    $consulta2 = "UPDATE usuarios SET password = ? WHERE token = ?";
    $stmt2 = $con->prepare($consulta2);
    $stmt2->bind_param('ss', $hashed_password, $token);

    if ($stmt2->execute()) {
        // Generar un nuevo token (o eliminar el token)
        $newToken = bin2hex(random_bytes(8));
        // Actualizar el campo token en la tabla de usuarios
        $consulta3 = "UPDATE usuarios SET token = ? WHERE token = ?";
        $stmt3 = $con->prepare($consulta3);
        $stmt3->bind_param('ss', $newToken, $token);

        if ($stmt3->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
    }
} else {
    // Si no se encuentra el token en la tabla de usuarios
    echo json_encode(['success' => false, 'error' => 'Token no válido']);
}

$con->close();
?>
