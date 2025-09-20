<?php
header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../database.php';

$database = new Database('prospectos');
$db = $database->getConnection();

$data = json_decode(file_get_contents('php://input'), true);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        if (isset($data['id_prospecto']) && isset($data['id_contacto_emergencia'])) {
            handleAddProspectoContacto($db, $data);
        } else if (isset($data['id_prospecto']) ) {
            handleDeleteProspectoContacto($db, $data);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}

function handleAddProspectoContacto($db, $data) {
    $query = "INSERT INTO prospecto_contacto_emergencia (id_prospecto, id_contacto_emergencia) VALUES (?, ?)";
    $values = [
        $data['id_prospecto'] ?? null,
        $data['id_contacto_emergencia'] ?? null
    ];

    try {
        $stmt = $db->prepare($query);
        $stmt->execute($values);
        
        echo json_encode([
            'success' => true,
            'message' => 'Relación prospecto-contacto agregada exitosamente'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error interno del servidor: ' . $e->getMessage()
        ]);
    }
}

function handleDeleteProspectoContacto($db, $data) {
    if (!isset($data['id_prospecto'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID de prospecto es requerido']);
        return;
    }

    $query = "DELETE FROM prospecto_contacto_emergencia WHERE id_prospecto = ? ";
    $values = [
        $data['id_prospecto']
    ];

    try {
        $stmt = $db->prepare($query);
        $stmt->execute($values);
        
        echo json_encode([
            'success' => true,
            'message' => 'Relación prospecto-contacto eliminada exitosamente'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error interno del servidor: ' . $e->getMessage()
        ]);
    }
}
?>