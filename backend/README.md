

Курс:
материалы
    лекции?
        номер?
        название
        контент
        файлы (рукописный, печатные)
            название
            описание
            url[]
    семинары?
    
    лабы?
        номер
        название
        контент
        url
    рк?
        номер?
        название
        файлы
    экзамен?
        номер?
        название
        файлы


material = {
    course_id,
    material_id,
    number,
    type_material = [lecture, seminar, lab, exam, rk],
    name, 
    content, 
}


file = {
    file_id,
    material_id,
    name, 
    description,
    url
}




problems:
1. server doesnt wotk if ftp is not running
2. files upload
3. fix login and register 