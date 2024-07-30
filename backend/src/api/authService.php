<?php

use Firebase\JWT\ExpiredException;
require_once("./../lib/php-jwt/vendor/autoload.php");
include 'database.php';
use \Firebase\JWT\JWT;

class AuthService
{
    private static ?object $loggedUser = null;
    public $SECRET_KEY = "xddd"; //key secret
    public $ACCESS_TOKEN_EXP_TIME = 20 * 60; // 3 minutes
    public $REFRESH_TOKEN_EXP_TIME = 60 * 60 * 24; // 1 day 
    private $MAX_LOGIN_ATTEMPTS = 3; // attemps max
    private $ACCESS_TOKEN_EMAIL_EXP_TIME = 15 * 60; // 15 minutes

    private function findIdByEmail($to, $con)
    {
        if (!$con) {
            throw new Exception("Error: Conexión a la base de datos no establecida.");
        }

        $query = "SELECT * FROM QSC_USUARIOS WHERE id_user = ? LIMIT 1";
        $stmt = $con->prepare($query);
        if (!$stmt) {
            throw new Exception("Error de preparación de consulta: " . mysqli_error($con));
        }
        
        $stmt->bind_param('s', $to);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            return null;
        }

        $user = $result->fetch_object();
        return $user;
    }

    public function verifyUserAndSendToken($to, $con)
    {
        $user = $this->findUserById($to, $con);

        if (!$user) {
            throw new Exception("User incorrect");
        }

        $access_token_email = $this->generateToken($user, $this->ACCESS_TOKEN_EMAIL_EXP_TIME, $this->SECRET_KEY);

        return array(
            "access_token_email" => $access_token_email,
        );
    }

    private function findUserById($id, $con)
    {
        if (!$con) {
            throw new Exception("Error: Conexión a la base de datos no establecida.");
        }

        $query = "SELECT * FROM usuarios WHERE id = ? LIMIT 1";
        $stmt = $con->prepare($query);
        if (!$stmt) {
            throw new Exception("Error de preparación de consulta: " . mysqli_error($con));
        }
        
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            return null;
        }

        $user = $result->fetch_object();
        return $user;
    }

    public function generateToken($user, $exp_time, $SECRET_KEY)
    {
        $payload = array(
            "iss" => "https://localhost:8080/backend",
            "aud" => "https://localhost:8080/backend",
            "iat" => time(),
            "exp" => time() + $exp_time,
            "data" => array(
                "id" => $user->id_user,
                "name" => $user->n_name,
                "email" => $user->mail_user,
            ),
        );

        $jwt = JWT::encode($payload, $SECRET_KEY);
        return $jwt;
    }
}
