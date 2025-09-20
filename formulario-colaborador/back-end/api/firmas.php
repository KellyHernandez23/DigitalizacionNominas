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

$database = new Database('prospectos');
$db = $database->getConnection();

$data = json_decode(file_get_contents('php://input'), true);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        if (isset($data['id_prospecto']) && !isset($data['image_base64'])) {
            handleDeleteFirma($db, $data);
        } else {
            handleAddFirma($db, $data);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}

function handleAddFirma($db, $data) {
    if (!isset($data['image_base64'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos de imagen requeridos']);
        return;
    }

    // Convertir base64 a binario
    $imageData = base64_decode($data['image_base64']);
    if ($imageData === false) {
        http_response_code(400);
        echo json_encode(['error' => 'Formato base64 inválido']);
        return;
    }

    $query = "INSERT INTO firma_prospecto (id_prospecto, nombre_archivo, image_blob, tipo, fecha_creacion) 
              VALUES (?, ?, ?, ?, ?)";
    
    $values = [
        $data['id_prospecto'] ?? null,
        $data['nombre_archivo'] ?? 'firma.png',
        $imageData,
        $data['tipo'] ?? 'image/png',
        date('Y-m-d H:i:s')
    ];

    try {
        $stmt = $db->prepare($query);
        $stmt->execute($values);
        
        echo json_encode([
            'success' => true,
            'message' => 'Firma agregada exitosamente',
            'id' => $db->lastInsertId()
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error interno del servidor: ' . $e->getMessage()
        ]);
    }
}

function handleDeleteFirma($db, $data) {
    $query = "DELETE FROM firma_prospecto WHERE id_prospecto = ?";
    
    try {
        $stmt = $db->prepare($query);
        $stmt->execute([$data['id_prospecto']]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Firma eliminada exitosamente'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Error interno del servidor: ' . $e->getMessage()
        ]);
    }
}
?>