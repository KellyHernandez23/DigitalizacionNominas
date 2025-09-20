<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class Database {
    private $host = 'localhost';
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct($database_type) {
        if ($database_type === 'vacaciones') {
            $this->db_name = 'app_vacaciones';
            $this->username = 'root';
            $this->password = 'root';
        } elseif ($database_type === 'prospectos') {
            $this->db_name = 'ti_prospectos';
            $this->username = 'ti_prospecto_user';
            $this->password = 'Ti_prospectos';
        }
    }

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8",
                $this->username, 
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo json_encode([
                'success' => false,
                'message' => 'Error de conexión: ' . $exception->getMessage()
            ]);
            exit;
        }
        return $this->conn;
    }
}

// Manejo de preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
?>