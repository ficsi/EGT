const addActiveClass = (container) => {
    const children = container.childNodes;
    children.forEach((item) => {
        item.addEventListener('click', (element) => {
            container.childNodes.forEach((el) => {
                if (el.childNodes.length === 0) {
                    return;
                }
                el.querySelector('a').classList.remove('active');
            });

            item.querySelector('a').classList.add('active');
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.--mobile_shortcuts');
    addActiveClass(container);
});
