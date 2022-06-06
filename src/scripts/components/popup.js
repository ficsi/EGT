(() => {
    let container = document.querySelector('.management-container');

    const popup = (img, name, text) => {
        let container = document.createElement('div'),
            image = document.createElement('img'),
            info = document.createElement('div'),
            textContainer = document.createElement('div'),
            bio = document.createElement('div'),
            more = document.createElement('div'),
            close = document.createElement('span');

        image.setAttribute('src', img);
        info.classList.add('info');
        info.innerText = name;
        info.appendChild(image);

        if (text.length > 0) {
            bio.classList.add('bio');
            more.classList.add('more');
            for (let i = 0; i < text.length; i++) {
                bio.innerText = text[0];
                more.innerText = text[1];
            }
            textContainer.classList.add('text');
            textContainer.appendChild(bio);
            textContainer.appendChild(more);

            container.appendChild(textContainer);
        }

        container.classList.add('popup-container');
        close.classList.add('btn-close');
        container.appendChild(info);
        container.appendChild(close);

        return container;
    };

    container.addEventListener('click', (e) => {
        if (e.target.parentNode.classList.contains('employee')) {
            let currentId = e.target.parentNode.dataset.employeeid;
            const data = require('../../data/emplyees.json');
            if (data[currentId]) {
                let popups = document.querySelector('.popup-container');
                if (popups) {
                    return;
                }
                e.target
                    .closest('.wrapper')
                    .append(
                        popup(data[currentId].img, data[currentId].name, [data[currentId].info, data[currentId].more])
                    );

                let close = document.querySelector('.btn-close');
                if (close) {
                    close.addEventListener('click', (e) => {
                        e.target.closest('.popup-container').remove();
                    });
                }
            }
        }
    });
})();
