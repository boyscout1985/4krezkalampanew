Lampa.Plugin(function(plugin) {
    plugin.addSource('4krezka', {
        title: '4K Rezka',
        type: 'video',
        handler: function(callback, params) {
            let url = 'https://4krezka.net/'; // URL главной страницы
            fetch(url)
                .then(response => response.text())
                .then(html => {
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(html, 'text/html');

                    // Пример: найди элементы фильмов
                    let items = [];
                    doc.querySelectorAll('.b-content__inline_items .b-content__inline_item').forEach(item => {
                        let title = item.querySelector('.b-content__inline_item-link').textContent;
                        let link = item.querySelector('.b-content__inline_item-link').href;
                        let poster = item.querySelector('img').src;

                        items.push({
                            title: title,
                            url: link,
                            poster: poster
                        });
                    });

                    callback(items);
                })
                .catch(error => {
                    console.error('Ошибка парсинга 4krezka.net:', error);
                });
        }
    });
});
