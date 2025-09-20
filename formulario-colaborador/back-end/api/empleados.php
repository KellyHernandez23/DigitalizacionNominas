<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$rfc = $data['rfc'] ?? '';

if (empty($rfc)) {
    http_response_code(400);
    echo json_encode(['error' => 'RFC requerido']);
    exit;
}

$database = new Database('vacaciones');
$db = $database->getConnection();

try {
    $query = 'SELECT * FROM empleados WHERE rfc = ?';
    $stmt = $db->prepare($query);
    $stmt->execute([$rfc]);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($results) > 0) {
        echo json_encode(['success' => true, 'user' => $results[0]]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'RFC no encontrado']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error del servidor: ' . $e->getMessage()]);
}
?>