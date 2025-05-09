-- УДАЛЕНИЕ ВСЕХ ДАННЫХ ИЗ БД
delete from
    sessions;

delete from
    user_featured_courses;

delete from
    material_files;

delete from
    materials;

delete from
    courses;

delete from
    users;

-- Вставка курсов
INSERT INTO
    courses (name, description, semester, teacher, hours)
VALUES
    -- 1 семестр
    (
        'Алгоритмы и структуры данных',
        'Фундаментальный курс, охватывающий основные алгоритмы сортировки (быстрая сортировка, сортировка слиянием), поиска (бинарный поиск), структуры данных (массивы, связные списки, стеки, очереди, хеш-таблицы, деревья, графы). Рассматриваются методы анализа сложности алгоритмов (O-нотация), принципы динамического программирования и жадных алгоритмов. Практические занятия включают реализацию алгоритмов на языке программирования.',
        1,
        'Коновалов Александр Владимирович',
        144
    ),
    (
        'Иностранный язык',
        'Комплексный курс, направленный на развитие всех языковых навыков: грамматики (времена, модальные глаголы, условные предложения), лексики (базовый словарный запас 1500-2000 слов), чтения (аутентичные тексты), аудирования (понимание на слух), письма (составление писем, эссе) и устной речи (диалоги, монологи). Особое внимание уделяется профессиональной лексике и подготовке к международным экзаменам.',
        1,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Социология',
        'Введение в социологическую науку: история социологии (Конт, Дюркгейм, Вебер), основные социологические теории (функционализм, конфликтология, символический интеракционизм), методы социологических исследований (анкетирование, интервью, наблюдение). Изучаются социальные институты (семья, образование, религия), стратификация и мобильность, культура и социализация. Практическая часть включает проведение мини-исследований.',
        1,
        'Имя преподавателя отсутствует',
        108
    ),
    (
        'Физическая культура и спорт',
        'Развитие физических качеств и укрепление здоровья путём систематических занятий спортом',
        1,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Линейная алгебра и аналитическая геометрия',
        'Изучение векторов, матриц, систем линейных уравнений и геометрических преобразований',
        1,
        'Безверхний Николай Владимирович',
        216
    ),
    (
        'Математический анализ',
        'Основные понятия дифференциального и интегрального исчисления функций одной переменной',
        1,
        'Иванков Павел Леонидович / Хасанов Наиль Алфатович',
        216
    ),
    (
        'Основы информатики',
        'Знакомство с архитектурой ЭВМ, основами программирования и компьютерными системами',
        1,
        'Коновалов Александ Владимирович',
        180
    ),
    -- 2 семестр
    (
        'Дискретная математика',
        'Рассмотрение логических оснований, комбинаторики, теории графов и исчислений высказываний',
        2,
        'Коновалов Александр Владимирович',
        180
    ),
    (
        'Иностранный язык',
        'Углублённое развитие языковых навыков на основе пройденного материала, расширение словарного запаса',
        2,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'История',
        'Обзор ключевых исторических событий и периодов, анализ их влияния на современный мир',
        2,
        'Имя преподавателя отсутствует',
        108
    ),
    (
        'Физическая культура и спорт',
        'Комплекс упражнений и спортивных игр для поддержания здоровья и развития выносливости',
        2,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Линейная алгебра и аналитическая геометрия',
        'Углублённое изучение теории матриц, собственных значений и геометрических преобразований',
        2,
        'Безверхний Николай Владимирович',
        216
    ),
    (
        'Математический анализ',
        'Развитие навыков работы с рядами, функциями нескольких переменных и основами теории пределов',
        2,
        'Иванков Павел Леонидович / Хасанов Наиль Алфатович',
        216
    ),
    (
        'Язык и методы программирования',
        'Изучение концепций и стилей программирования, работа с одним или несколькими современными языками',
        2,
        'Посевин Данила Павлович',
        216
    ),
    -- 3 семестр
    (
        'Иностранный язык',
        'Развитие коммуникативной компетенции и повышение уровня владения языком для профильных целей',
        3,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Обыкновенные дифференциальные уравнения',
        'Теория и методы решения дифференциальных уравнений первого и высших порядков',
        3,
        'Бояринов Роман Николаевич',
        144
    ),
    (
        'Правоведение',
        'Основные правовые системы, источники права и правовые нормы в современном обществе',
        3,
        'Имя преподавателя отсутствует',
        108
    ),
    (
        'Физическая культура и спорт',
        'Регулярные тренировки, направленные на улучшение физических кондиций и стрессоустойчивости',
        3,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Компьютерные сети',
        'Основы сетевых технологий, протоколы взаимодействия и принципы передачи данных в локальных и глобальных сетях',
        3,
        'Посевин Данила Павлович',
        180
    ),
    (
        'Математический анализ',
        'Дальнейшее углубление в теорию пределов, дифференциалов и интегралов в многомерных пространствах',
        3,
        'Иванков Павел Леонидович / Хасанов Наиль Алфатович',
        216
    ),
    (
        'Низкоуровневое программирование',
        'Работа с языками ассемблера и понимание архитектуры процессоров на практике',
        3,
        'Царев Александр Сергеевич',
        180
    ),
    (
        'Алгебра',
        'Основы абстрактной алгебры: группы, кольца, поля и их свойства',
        3,
        'Белоусов Григорий Николаевич',
        108
    ),
    -- 4 семестр
    (
        'Дополнительные главы математического анализа',
        'Изучение функциональных рядов, особых функций и более сложных разделов анализа',
        4,
        'Канатников Анатолий Николаевич',
        144
    ),
    (
        'Иностранный язык',
        'Систематизация и совершенствование языковых навыков, подготовка к специализированной коммуникации',
        4,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Операционные системы',
        'Принципы построения ОС: управление процессами (создание, планирование, синхронизация), управление памятью (страничная организация, виртуальная память), файловые системы (структура, кэширование), ввод-вывод (драйверы устройств), безопасность (модели доступа). Практикум включает программирование на уровне ядра (Linux) и анализ исходного кода.',
        4,
        'Брагин Алексей Владимирович',
        144
    ),
    (
        'Политология',
        'Изучение политических систем, институтов, идеологий и процессов принятия политических решений',
        4,
        'Имя преподавателя отсутствует',
        108
    ),
    (
        'Физическая культура и спорт',
        'Развитие координации и общей физической подготовки, участие в командных видах спорта',
        4,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Алгебра',
        'Углублённое изучение алгебраических структур, морфизмов и их применений',
        4,
        'Белоусов Григорий Николаевич',
        108
    ),
    (
        'Комплексный анализ',
        'Теория функций комплексной переменной, аналитические функции и интегралы',
        4,
        'Иванков Павел Леонидович / Хасанов Наиль Алфатович',
        144
    ),
    (
        'Обыкновенные дифференциальные уравнения',
        'Продолжение изучения линейных и нелинейных уравнений, методы решения систем ОДУ',
        4,
        'Бояринов Роман Николаевич',
        144
    ),
    -- 5 семестр
    (
        'Иностранный язык',
        'Дальнейшее совершенствование грамматики, лексики и навыков ведения дискуссий на иностранном языке',
        5,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Логика и теория алгоритмов',
        'Исследование логических систем, формальных доказательств и теоретических основ алгоритмизации',
        5,
        'Андреева Татьяна Владимировна',
        108
    ),
    (
        'Основы теории Галуа',
        'Знакомство с расширениями полей, разложимыми многочленами и группами Галуа',
        5,
        'Белоусов Григорий Николаевич',
        144
    ),
    (
        'Разработка параллельных и распределённых задач',
        'Методы программирования многопоточных и распределённых систем, оптимизация вычислений',
        5,
        'Царев Александр Сергеевич',
        108
    ),
    (
        'Физическая культура и спорт',
        'Поддержание здорового образа жизни и регулярное совершенствование двигательных навыков',
        5,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Базы данных',
        'Проектирование и реализация БД: реляционная модель (нормальные формы), SQL (запросы, соединения, агрегация), транзакции (ACID, уровни изоляции), индексы и оптимизация, NoSQL (документоориентированные, графовые). Курсовой проект - разработка базы данных для реального приложения (например, интернет-магазина) с клиентским интерфейсом.',
        5,
        'Вишняков Игорь Эдуардович',
        180
    ),
    (
        'Теория формальных языков',
        'Анализ грамматик, автоматов и формальных языков, их применение в области компиляторов',
        5,
        'Непейвода Антонина Николаевна',
        144
    ),
    (
        'Функциональный анализ',
        'Основы функциональных пространств, операторы и их спектры, приложения к дифференциальным уравнениям',
        5,
        'Белоусов Григорий Николаевич',
        108
    ),
    -- 6 семестр
    (
        'Генерация оптимального кода',
        'Теория и практика оптимизаций на уровне компиляции, анализ кода и трансформации',
        6,
        'Коновалов Александр Владимирович',
        108
    ),
    (
        'Объектно-функциональное программирование',
        'Совмещение парадигм объектного и функционального программирования, паттерны и концепции',
        6,
        'Коновалов Александр Владимирович',
        108
    ),
    (
        'Основы теории колец',
        'Исследование свойств колец, идеалов, гомоморфизмов и модулярных структур',
        6,
        'Белоусов Григорий Николаевич',
        108
    ),
    (
        'Философия',
        'Краткий обзор основных философских направлений и проблем, формирование критического мышления',
        6,
        'Имя преподавателя отсутствует',
        108
    ),
    (
        'Численные методы',
        'Методы приближённого решения уравнений, интерполяции, интегрирования и дифференциальных задач',
        6,
        'Домрачева Анна Борисовна',
        108
    ),
    (
        'Физическая культура и спорт',
        'Усиленная программа по развитию двигательных качеств, профилактика травм и здоровый образ жизни',
        6,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Дифференциальные уравнения в частных производных',
        'Фундаментальные методы решения уравнений в частных производных, теория и численные подходы',
        6,
        'Канатников Анатолий Николаевич',
        144
    ),
    (
        'Конструирование компиляторов',
        'Этапы разработки компиляторов: лексический, синтаксический анализ, генерация и оптимизация кода',
        6,
        'Коновалов Александр Владимирович',
        180
    ),
    (
        'Иностранный язык',
        'Углублённая практика общения, чтения профессиональной литературы, расширение лексического запаса',
        6,
        'Имя преподавателя отсутствует',
        72
    ),
    -- 7 семестр
    (
        'Алгоритмы биоинформатики',
        'Специализированные алгоритмы анализа биологических данных, работа с геномными последовательностями',
        7,
        'Страшнов Павел Викторович',
        108
    ),
    (
        'Безопасность жизнедеятельности',
        'Основы охраны труда, противопожарной безопасности и защиты в чрезвычайных ситуациях',
        7,
        'Бондаренко Анна Викторовна',
        144
    ),
    (
        'Начальный курс немецкого языка',
        'Изучение базовых грамматических конструкций и лексики немецкого языка, развитие навыков говорения',
        7,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Начальный курс французского языка',
        'Основы фонетики, грамматики и лексики французского языка, формирование базовых коммуникативных навыков',
        7,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Экономика 1',
        'Введение в микро- и макроэкономику, анализ спроса, предложения и рыночных структур',
        7,
        'Имя преподавателя отсутствует',
        108
    ),
    (
        'Разработка мобильных приложений',
        'Проектирование, реализация и тестирование мобильных приложений на популярных платформах',
        7,
        'Посевин Данила Павлович',
        144
    ),
    (
        'Теория искусственных нейронных сетей',
        'Модели искусственных нейронных сетей, алгоритмы обучения и их применение в анализе данных',
        7,
        'Каганов Юрий Тихонович',
        108
    ),
    (
        'Численные методы линейной алгебры',
        'Алгоритмы решения больших систем линейных уравнений, вычисления собственных значений и разложений',
        7,
        'Посевин Данила Павлович',
        144
    ),
    (
        'Теория вероятностей и математическая статистика',
        'Основные понятия теории вероятностей, модели случайных процессов и статистические методы анализа',
        7,
        'Горяинов Владимир Борисович',
        144
    ),
    -- 8 семестр
    (
        'Моделирование',
        'Построение и анализ математических моделей реальных систем, применение компьютерных симуляций',
        8,
        'Домрачева Анна Борисовна',
        252
    ),
    (
        'Начальный курс немецкого языка',
        'Дальнейшее освоение лексики и грамматики, практика диалогов и чтения текстов на немецком языке',
        8,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Начальный курс французского языка',
        'Продолжение изучения базовых структур французского языка, развитие навыков аудирования и говорения',
        8,
        'Имя преподавателя отсутствует',
        72
    ),
    (
        'Методы оптимизации',
        'Изучение методов оптимизации функций, линейное и нелинейное программирование, численные алгоритмы',
        8,
        'Посевин Данила Павлович',
        252
    ),
    (
        'Экономика 2',
        'Продолжение курса по экономике, расширенный анализ макроэкономических показателей и бизнес-процессов',
        8,
        'Имя преподавателя отсутствует',
        108
    );

-- 360 - методы оптимизации
INSERT INTO
    materials (course_id, material_type, name, number, content)
VALUES
    (
        -- id 36
        -- 2a944acb-31d9-4cc7-b00b-e8e13ff3a187
        360,
        'labs',
        'Оптимизация унимодальных функций: сравнение методов',
        2,
        'Лабораторная работа посвящена изучению методов одномерной оптимизации для унимодальных функций. В ходе работы исследуются четыре алгоритма: Метод равномерного перебора, метод бисекции (деления пополам), метод Фибоначчи, метод золотого сечения. Цель — сравнить их эффективность по количеству итераций и точности на заданных интервалах.'
    ),
    (
        -- id 37
        -- 5eb7912a-3671-4221-b4ae-7d5223029a6c
        360,
        'labs',
        'Методы спуска в многомерной оптимизации: сравнительный анализ',
        3,
        'Лабораторная работа посвящена изучению методов спуска для минимизации многомерных функций. Рассматриваются три алгоритма:
        метод Гаусса-Зейделя (покоординатный спуск),
        метод Хука-Дживса (поиск по образцу),
        метод наискорейшего спуска (градиентный метод).
        Цель — сравнить их эффективность по скорости сходимости, количеству итераций и устойчивости к выбору начальной точки.'
    );

INSERT INTO
    materials (course_id, material_type, name, number, content)
VALUES
    (
        -- id 38
        -- f82597ea-80e8-468e-b330-a324a2e439b0
        -- 17b862fc-178b-4eb3-926a-6b4ea11e7da2
        -- c3390268-76cb-4966-96d9-3bfe64b956c1
        -- убрать последние 2 файла.
        360,
        'lectures',
        'Поиск минимума функции одного переменного: методы перебора, деления пополам, золотого сечения и Фибоначчи.',
        1,
        'Лекция посвящена различным методам поиска экстремумов функции одной переменной. В частности, рассматриваются методы перебора, деления пополам (дихотомия), золотого сечения и Фибоначчи. Эти методы применяются для нахождения наибольшего или наименьшего значения целевой функции на заданном интервале. Лекция включает математическую постановку задач оптимизации, объяснение понятий глобального минимума и максимума, а также подробные алгоритми и теоремы, обеспечивающие гарантии существования экстремумов. В дополнение представлены примеры реализации этих методов на языке программирования Julia.'
    ),
    (
        -- id 39
        360,
        'lectures',
        'Необходимое и достаточное условия существования локального экстремума',
        2,
        'Лекция посвящена анализу условий существования локальных экстремумов для функций одной и нескольких переменных. Рассматриваются основные теоремы, такие как теорема Ферма, условия для дифференцируемых и не дифференцируемых функций, критерии для локальных экстремумов, а также понятие выпуклых функций и их свойства.
            Теоремы, такие как второй и третий достаточный признак экстремума, и теорема Вейерштрасса помогают в понимании того, как можно идентифицировать экстремумы. В лекции также охватываются задачи оптимизации с ограничениями, включая использование функции Лагранжа и методов для поиска условных экстремумов с анализом через матрицу Гессе.
            Для практической реализации этих методов рассмотрены примеры, включая методы поиска экстремума для функций двух и нескольких переменных.'
    ),
    (
        -- id 40
        360,
        'lectures',
        'Численные методы минимизации функции нескольких переменных (безусловная оптимизация)',
        3,
        'Лекция посвящена численным методам для поиска экстремумов функций нескольких переменных без ограничений. Рассматриваются основные методы минимизации, такие как метод спуска, градиентный спуск, метод наискорейшего спуска, метод сопряженных градиентов, метод Ньютона, а также их модификации, включая методы Ньютона-Рафсона и методы с фиксированной матрицей Гессе.
Также обсуждаются различные алгоритмы, такие как метод Пауэлла, методы квадратичной аппроксимации, методы оптимизации с использованием симплексных алгоритмов и алгоритмов Нельдера-Мида. Приводятся теоремы, обеспечивающие сходимость этих методов, и примеры их реализации на языке Julia. В лекции также рассмотрены критерии остановки и способы выбора направления и величины шага для методов, а также их применение для реальных задач оптимизации.'
    ),
    (
        -- id 41
        360,
        'lectures',
        'Усовершенствование метода спуска',
        5,
        'Лекция посвящена усовершенствованию методов спуска для минимизации функций нескольких переменных. Рассматриваются различные методы, включая метод градиентного спуска, метод наискорейшего спуска, а также более сложные методы, такие как методы Флэтчера-Ривса и Полака-Рибьера для сопряженных градиентов. Особое внимание уделяется улучшениям в выборе шага и направления спуска, включая методы, которые используют адаптивное изменение шага для оптимизации процесса минимизации.
В лекции также обсуждаются геометрические интерпретации различных методов спуска и их сходимость, включая методы для квадратичных функций и их применения на практике. Рассматриваются примеры с использованием методов Флэтчера-Ривса и наискорейшего спуска, а также способы их применения для задач с большими размерами данных и функциями.
В заключение обсуждаются более сложные методы, такие как метод Ньютона и квазиньютоновские методы, для ускорения сходимости и повышения точности поиска минимума. Приводятся примеры реализации методов на языке программирования, а также критерии остановки и возможные проблемы, которые могут возникать при оптимизации.'
    ),
    (
        -- id 42
        360,
        'lectures',
        'Метод Дэвидона-Флэтчера-Пауэла (Д.Ф.П.) и методы сопряженных градиентов',
        6,
        'Лекция посвящена методам оптимизации с переменной метрикой, с особым акцентом на метод Дэвидона-Флэтчера-Пауэла (Д.Ф.П.), а также на метод Бройдена и методы сопряженных градиентов. Эти методы используются для эффективного поиска экстремумов многомерных функций.
Метод Д.Ф.П. является одной из самых эффективных техник переменной метрики и является улучшением градиентного спуска с добавлением информации о втором порядке (аппроксимация матрицы Гессе). В процессе оптимизации этот метод помогает сходимости от градиентного метода к методу Ньютона, позволяя повысить скорость и точность нахождения решения.
Также рассматриваются методы BFGS и их модификации, такие как L-BFGS, которые широко применяются в задачах многомерной оптимизации благодаря своей эффективности и стабильности, особенно при большом числе переменных. В лекции объясняются принципы работы этих методов, их алгоритмическая реализация и примеры на языке Julia.
Также рассматривается метод Ньютона, его модификации, и как с их помощью можно эффективно решать задачи оптимизации без вычисления матрицы Гессе на каждом шаге. Приводятся примеры применения методов на реальных задачах и объясняются критерии сходимости этих методов.
В завершение обсуждаются методы вычисления и пересчета матриц для методов переменной метрики, в том числе методы Бройдена, и применение их в практических задачах.'
    ),
    (
        -- id 43
        360,
        'lectures',
        'Эффективность численных методов оптимизации',
        7,
        'Лекция посвящена оценке эффективности численных методов оптимизации, включая метод Дэвидона-Флэтчера-Пауэла (Д.Ф.П.), метод Бройдена, и алгоритмы с аппроксимацией матрицы Гессе. Рассматриваются алгоритмы для многомерной оптимизации, такие как методы сопряженных градиентов, и подходы с переменной метрикой, включая алгоритмы Ньютона-Рафсона и их модификации.
Особое внимание уделяется методу Д.Ф.П., который является эффективным алгоритмом с переменной метрикой, который используется для аппроксимации матрицы Гессе, что позволяет ускорить сходимость при решении задач оптимизации. Также рассматриваются другие методы переменной метрики, такие как BFGS, и их использование в реальных задачах.
Лекция описывает основные теоремы, обеспечивающие сходимость этих методов, и критерии эффективности. Также рассматриваются различные подходы к улучшению сходимости, включая использование аппроксимаций для вычислений и контроль положительной определенности матриц. В завершение обсуждаются критерии остановки и сложности этих методов в зависимости от задачи.
Приводятся примеры реализации на языке Julia, а также примеры с числовыми решениями задач оптимизации, таких как минимизация функции Розенброка и других тестовых функций.'
    ),
    (
        -- id 44
        360,
        'lectures',
        'Метод многомерной условной оптимизации',
        8,
        'Лекция охватывает методы оптимизации, когда задача включает ограничения, и рассматривается как преобразовать задачу условной оптимизации в задачу безусловной оптимизации. Рассматриваются два основных подхода: метод штрафных функций и метод барьерных функций.'
    );