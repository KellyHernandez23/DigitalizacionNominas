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
        if (isset($data['id_contacto_emergencia'])) {
            handleDeleteContacto($db, $data);
        } 
        else {
            handleAddContacto($db, $data);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}

function handleAddContacto($db, $data) {
    $query = "INSERT INTO contacto_emergencia (nombre_contacto, telefono, parentesco) VALUES (?, ?, ?)";
    $values = [
        $data['nombre_contacto'] ?? null,
        $data['telefono'] ?? null,
        $data['parentesco'] ?? null
    ];

    try {
        $stmt = $db->prepare($query);
        $stmt->execute($values);
        $insertId = $db->lastInsertId();
        
        echo json_encode([
            'success' => true,
            'message' => 'Contacto de emergencia agregado exitosamente',
            'id' => $insertId,
            'nombre' => $data['nombre_contacto']
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error interno del servidor: ' . $e->getMessage()
        ]);
    }
}

// function handleAddProspectoContacto($db, $data) {
//     $query = "INSERT INTO prospecto_contacto_emergencia (id_prospecto, id_contacto_emergencia) VALUES (?, ?)";
//     $values = [
//         $data['id_prospecto'] ?? null,
//         $data['id_contacto_emergencia'] ?? null
//     ];

//     try {
//         $stmt = $db->prepare($query);
//         $stmt->execute($values);
        
//         echo json_encode([
//             'success' => true,
//             'message' => 'Relación prospecto-contacto agregada exitosamente'
//         ]);
//     } catch (PDOException $e) {
//         http_response_code(500);
//         echo json_encode([
//             'success' => false,
//             'error' => 'Error interno del servidor: ' . $e->getMessage()
//         ]);
//     }
// }

function handleDeleteContacto($db, $data) {
    $query = "DELETE FROM contacto_emergencia WHERE id_contacto_emergencia = ?";
    
    try {
        $stmt = $db->prepare($query);
        $stmt->execute([$data['id_contacto_emergencia']]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Contacto eliminado exitosamente'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Error interno del servidor: ' . $e->getMessage()
        ]);
    }
}
?>