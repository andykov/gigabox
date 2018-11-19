<?

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require_once __DIR__ . '/PHPMailer/src/Exception.php';
require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/src/SMTP.php';
/**
 * Mailer: класс-хелпер, отправляет почту администратору
 */
class ContactMailer
{
	/**
     * E-mail отправителя
     * @var string
     */
    private static $emailFrom = 'gigabox@1ghs.ru';
    /**
     * E-mail получателя
     * @var string
     */
    private static $emailTo = 'industry@1ghs.ru';

    /**
     * Отправляет письмо, если письмо отправлено,
     * возвращает TRUE, в противном случае FALSE.
     * @param string $name
     * @param string $email
     * @param string $phone
     * @param string $city
     * @param string $budget
     * @param string $formSubject
     * @return boolean
     */

    public static function send($name, $phone, $email, $budget, $formSubject)
    {
        // Форматирование числа
        $budget = number_format($budget, 0, '', ' ');

		    // Формируем тело письма
		    $body = "Имя: " . $name . "\nТелефон: " . $phone . "\nE-mail: " . $email . "\nБюджет: " . $budget;

		    // Создаем объект PHPMailer
        $mailer = new PHPMailer();
        // Настройки подключения
        $mailer->isSMTP();
        // Устанавливает хост почтового сервера (Mail.ru: smtp.mail.ru, Google: smtp.gmail.com, Yandex: smtp.yandex.ru)
        $mailer->Host = ' smtp.yandex.ru';
        // Включает SMTP-авторизацию
        $mailer->SMTPAuth = true;
        // Логин или E-mail целиком
        $mailer->Username = self::$emailFrom;
        // Пароль от почтового ящика
        $mailer->Password = 'yerdna89gonze';
        // Протокол соединения
        $mailer->SMTPSecure = 'ssl';
        // Порт для исходящаей почты
        $mailer->Port = '465';

        // Устанавливает кодировку
        $mailer->CharSet = 'UTF-8';
        // Устанавливает E-mail и имя отправителя
        $mailer->setFrom(self::$emailFrom, $name . ': gigabox.com');
        // Добавляет E-mail получателя
        $mailer->addAddress(self::$emailTo);
        // Настройка HTML-формата
        $mailer->isHTML(false);
        // Тема письма
        $mailer->Subject = 'Форма: ' . $formSubject;
        // Основное тело письма
        $mailer->Body = $body;
        
        // Отправляет письмо
        if ($mailer->send()) {
        	return true;
        } else {
    	    return false;
        }
    }
}

?>