DROP DATABASE IF EXISTS `it_blog`;

CREATE DATABASE `it_blog` DEFAULT CHARACTER SET utf8;

USE `it_blog`;

CREATE TABLE `photos` (
      `id` INT NOT NULL AUTO_INCREMENT,
      `photoURL` VARCHAR(255) NOT NULL,
      PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8;

CREATE TABLE `categories` (
      `id` INT NOT NULL AUTO_INCREMENT,
      `name` VARCHAR(255) NOT NULL,
      PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8;

CREATE TABLE `admins` (
      `login` VARCHAR(255) NOT NULL,
      `password` VARCHAR(255) NOT NULL
);

CREATE TABLE `posts` (
     `id` INT NOT NULL AUTO_INCREMENT,
     `title` VARCHAR(255) NOT NULL,
     `description` VARCHAR(512),
     `photoId` INT NOT NULL REFERENCES photos (id),
     `imageText` VARCHAR(50),
     `featured` BOOL NOT NULL,
     `date` DATETIME,
     `categoryId` INT REFERENCES categories (id),
     PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8;

INSERT INTO admins (`login`, `password`) VALUES ('admin', 'admin');

INSERT INTO photos (`photoURL`) VALUES ('https://img.gazeta.ru/files3/582/13460582/1560500531_2d06041b_4_600-pic4_zoom-1500x1500-34880.jpg');

INSERT INTO categories (`name`) VALUES ('Гаджеты');
INSERT INTO categories (`name`) VALUES ('Программирование');
INSERT INTO categories (`name`) VALUES ('Приложения');
INSERT INTO categories (`name`) VALUES ('Игры');
INSERT INTO categories (`name`) VALUES ('Прочее');

INSERT INTO `posts` (`id`, `title`, `description`, `photoId`, `imageText`, `featured`, `date`, `categoryId`) VALUES
(1, 'В iPhone 13 вернется сканер отпечатков', 'Компания Apple планирует добавить в новую модель смартфона, который условно называют iPhone 13, подэкранный сканер отпечатков пальцев Touch ID, сообщают зарубежные СМИ. Планируется, что этот датчик добавит в гаджет альтернативный способ его разблокировки, что особенно важно в условиях продолжающейся пандемии и масочного режима, когда сканер лица Face ID оказывается не очень эффективным.', 1, '', 1, NULL, 1),
(2, 'Тренды 2021 года в сфере систем хранения данных: взгляд Toshiba', 'В 2021 году резкий всплеск активности в сфере работы с данными будет ощущаться и в сегменте конечных устройств, и на уровне серверной инфраструктуры. Благодаря огромным и стабильным объемам производства в сочетании с привлекательной ценой и постоянными инновациями традиционные жесткие диски, несомненно, сохранят свою важную роль на рынке.  Хотя твердотельные накопители (SSD) привлекают намного больше внимания СМИ, важность жестких дисков не следует недооценивать, особенно с учетом того, что спрос на системы', 2, '', 1, NULL, 5),
(3, 'Хочу стать программистом: с какого языка начать в 2021 году?', 'Часто человек просто хочет познакомиться с новой для себя профессией и понять, подходит ли она ему. В таком случае бессмысленно лезть в дебри сложных языков. Выберите такой ЯП, который был бы прост в освоении и обеспечивал вас большой «группой поддержки»  в виде учебных материалов, видео, групп в соцсетях, форумов и пр. Наверняка вы слышали о Turbo Pascal – с него раньше все и начинали. Но сейчас мы не рекомендуем выбирать этот язык в качестве первого, так как по всем параметрам он безнадежно устарел.    Ja', 3, '', 1, NULL, 2),
(4, 'Apple снижает комиссию в App Store до 15 процентов.', 'Если же поступления от приложений разработчика, участвующего в программе, превысят порог в 1 миллион долларов, с этого момента и до конца года для него будет действовать стандартная ставка в 30 процентов. При снижении доходов в течение года (например, если раньше разработчик получал с приложений больше миллиона, а стал зарабатывать меньше) Apple также пересчитает комиссию и позволить платить 15 процентов, но с последующего года.  Apple очень вовремя решилась на этот шаг, поскольку законодатели по всему миру', 4, '', 1, NULL, 3),
(5, 'В PS Store стартовала распродажа «Выбор критиков» со скидками до 80 процентов', 'В PlayStation Store стартовала распродажа «Выбор критиков» со скидками до 80 процентов на игры для PlayStation 4 и PlayStation 5. Акция завершится 18 февраля.', 5, '', 1, NULL, 4);