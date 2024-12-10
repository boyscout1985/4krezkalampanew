Lampa.Plugin(function(plugin) {
    // Регистрация источника
    plugin.addSource('4krezka', {
        title: '4K Rezka',  // Название источника
        type: 'video',      // Тип контента
        handler: function(callback, params) {
            let url = 'https://4krezka.net';  // URL для запроса данных
            fetch(url)
                .then(response => response.text())  // Получаем HTML контент страницы
                .then(html => {
                    let parser = new DOMParser();  // Парсим HTML
                    let doc = parser.parseFromString(html, 'text/html');

                    // Получаем список фильмов или серий
                    let items = [];
                    doc.querySelectorAll('.b-content__inline_items .b-content__inline_item').forEach(item => {
                        let title = item.querySelector('.b-content__inline_item-link').textContent;
                        let link = item.querySelector('.b-content__inline_item-link').href;
                        let poster = item.querySelector('img').src;

                        items.push({
                            title: title,
                            url: link,      // Ссылка на фильм или серию
                            poster: poster   // Изображение постера
                        });
                    });

                    callback(items);  // Возвращаем обработанные данные
                })
                .catch(error => {
                    console.error('Ошибка парсинга 4krezka.net:', error);  // Логирование ошибок
                });
        }
    });
});
