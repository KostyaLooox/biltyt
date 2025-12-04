<?php
// Настройки
$to_email = '60karlik60.1@gmail.com';
$subject = 'Новое сообщение с сайта 4002Bizarre';

// Проверка метода запроса
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение данных из формы
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));
    
    // Валидация
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Имя обязательно";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Введите корректный email";
    }
    
    if (empty($message)) {
        $errors[] = "Сообщение не может быть пустым";
    }
    
    // Если есть ошибки
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit;
    }
    
    // Формирование письма
    $email_message = "
    <html>
    <head>
        <title>Новое сообщение с сайта</title>
        <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: #000; color: #fff; padding: 20px; }
            .content { padding: 20px; border: 2px solid #000; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #000; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>4002BIZARRE</h1>
                <p>Новое сообщение с сайта</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>От кого:</span> $name
                </div>
                <div class='field'>
                    <span class='label'>Email:</span> $email
                </div>
                <div class='field'>
                    <span class='label'>Сообщение:</span><br>
                    <p>$message</p>
                </div>
                <div class='field'>
                    <span class='label'>Дата:</span> " . date('d.m.Y H:i:s') . "
                </div>
                <div class='field'>
                    <span class='label'>IP адрес:</span> " . $_SERVER['REMOTE_ADDR'] . "
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Заголовки письма
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: 4002Bizarre Website <noreply@4002bizarre.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Отправка письма
    if (mail($to_email, $subject, $email_message, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Сообщение отправлено!']);
    } else {
        echo json_encode(['success' => false, 'errors' => ['Ошибка при отправке письма']]);
    }
} else {
    echo json_encode(['success' => false, 'errors' => ['Неправильный метод запроса']]);
}
?>