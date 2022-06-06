const dropdown = (element) => {
    element.forEach((item) => {
        item.addEventListener('click', (e) => {
            const target = item.querySelector('ul');
            if (e.target.classList.contains('btn-mobile_menu')) {
                const menuBtn = e.target;
                menuBtn.classList.toggle('--open');
                menuBtn.parentNode.querySelector('nav').classList.toggle('--visible');
            } else {
                target?.classList.toggle('--visible');
                if (target && target.classList.contains('--visible')) {
                    if (item.classList.contains('translate')) {
                        return;
                    }
                    target.parentNode.querySelector('.dropdown').style.transform = 'rotate(-90deg)';
                } else {
                    if (item.classList.contains('translate')) {
                        return;
                    }
                    target.parentNode.querySelector('.dropdown').style.transform = 'rotate(90deg)';
                }
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    let items = document.querySelectorAll('.footer-main .title');
    const translate = document.querySelectorAll('.translate');
    dropdown(translate);

    if (items.length === 0 || window.innerWidth > 768) {
        return;
    }
    const menu = document.querySelectorAll('.btn-mobile_menu');
    dropdown(items);
    dropdown(menu);
});
