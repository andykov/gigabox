<?

require_once __DIR__ . '/mailer/Validator.php';
require_once __DIR__ . '/mailer/ContactMailer.php';

if (!Validator::isAjax() || !Validator::isPost()) {
	echo 'Доступ запрещен!';
	exit;
}

$name = isset($_POST['clientName']) ? trim(strip_tags($_POST['clientName'])) : null;
$email = isset($_POST['clientEmail']) ? trim(strip_tags($_POST['clientEmail'])) : null;
$phone = isset($_POST['clientPhone']) ? trim(strip_tags($_POST['clientPhone'])) : null;
$budget = isset($_POST['clientBudget']) ? trim(strip_tags($_POST['clientBudget'])) : null;
$formSubject = isset($_POST['form_subject']) ? trim(strip_tags($_POST['form_subject'])) : null;
$download = isset($_POST['download']) ? trim(strip_tags($_POST['download'])) : null;

if (empty($name) || empty($phone)) {
	echo 'Все поля обязательны для заполнения.';
	exit;
}

if (!empty($email) && !Validator::isValidEmail($email)) {
	echo 'E-mail не соответствует формату.';
	exit;
}

if (!Validator::isValidPhone($phone)) {
	echo 'Телефон не соответствует формату.';
	exit;
}

if (!empty($download)) {
    $filePath = 'docs/' . $download;
    $fileHave = false;
    $fileError = '';

    if (file_exists($filePath)) {
        $fileHave = true; // Файл существует
    } else {
        $fileError = 'Файл не найден';
    }
} else {
    $filePath = false;
}

if (ContactMailer::send($name, $phone, $email, $budget, $formSubject)) {
    $reply = [
        'send'=> true,
        'message' => htmlspecialchars($name) . ', ваше сообщение успешно отправлено.',
        'file' => $filePath,
        'file_have' => $fileHave,
        'file_error' => $fileError
    ];
    echo json_encode($reply);
} else {
    echo 'Произошла ошибка! Не удалось отправить сообщение.';
}
exit;

?>