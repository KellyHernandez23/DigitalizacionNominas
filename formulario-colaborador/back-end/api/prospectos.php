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

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (isset($data['id_prospecto'])) {
            // DELETE prospecto
            handleDeleteProspecto($db, $data);
        } else {
            // ADD prospecto
            handleAddProspecto($db, $data);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}

function handleAddProspecto($db, $data) {
    $dateToday = date('Y-m-d H:i:s');
    
    $query = "INSERT INTO prospecto(fecha_registro, nombre_prospecto, apellido_paterno_prospecto, 
              apellido_materno_prospecto, fecha_nacimiento, sexo, lugar_nacimiento, estado_civil, 
              curp, rfc, nss, umf, numero_cuenta, calle, numero_exterior, numero_interior, 
              colonia, codigo_postal, localidad, municipio, estado, numero_celular, 
              telefono_casa, correo_cfdi, escolaridad, hijos, nombre_padre, nombre_madre, 
              tipo_sangre, alergias, procedimientos_medicos, infonavit, fonacot, 
              pension_alimenticia, id_detalles_puesto) 
              VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    
    $values = [
        $dateToday,
        $data['nombre_prospecto'] ?? null,
        $data['apellido_paterno_prospecto'] ?? null,
        $data['apellido_materno_prospecto'] ?? null,
        $data['fecha_nacimiento'] ?? null,
        $data['sexo'] ?? null,
        $data['lugar_nacimiento'] ?? null,
        $data['estado_civil'] ?? null,
        $data['curp'] ?? null,
        $data['rfc'] ?? null,
        $data['nss'] ?? null,
        $data['umf'] ?? null,
        $data['numero_cuenta'] ?? null,
        $data['calle'] ?? null,
        $data['numero_exterior'] ?? null,
        $data['numero_interior'] ?? null,
        $data['colonia'] ?? null,
        $data['codigo_postal'] ?? null,
        $data['localidad'] ?? null,
        $data['municipio'] ?? null,
        $data['estado'] ?? null,
        $data['numero_celular'] ?? null,
        $data['telefono_casa'] ?? null,
        $data['correo_cfdi'] ?? null,
        $data['escolaridad'] ?? null,
        $data['hijos'] ?? null,
        $data['nombre_padre'] ?? null,
        $data['nombre_madre'] ?? null,
        $data['tipo_sangre'] ?? null,
        $data['alergias'] ?? null,
        $data['procedimientos_medicos'] ?? null,
        $data['infonavit'] ?? null,
        $data['fonacot'] ?? null,
        ($data['pension_alimenticia'] === 'true') ? 1 : 0,
        $data['id_detalles_puesto'] ?? null
    ];

    try {
        $stmt = $db->prepare($query);
        $stmt->execute($values);
        $insertId = $db->lastInsertId();
        
        echo json_encode([
            'success' => true,
            'message' => 'Prospecto agregado exitosamente',
            'id' => $insertId,
            'nombre' => $data['nombre_prospecto']
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error interno del servidor: ' . $e->getMessage(),
            'sqlError' => $e->getMessage()
        ]);
    }
}

function handleDeleteProspecto($db, $data) {
    $query = "DELETE FROM prospecto WHERE id_prospectos = ?";
    
    try {
        $stmt = $db->prepare($query);
        $stmt->execute([$data['id_prospecto']]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Prospecto eliminado exitosamente'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Error interno del servidor: ' . $e->getMessage()
        ]);
    }
}
?>