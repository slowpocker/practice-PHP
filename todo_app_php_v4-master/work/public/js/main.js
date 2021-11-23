'use strict';

{
    const token = document.querySelector('main').dataset.token;

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // checkbox.parentNode.submit();
            //fetch(送信先のURL,送信する形式)
            fetch('?action=toggle', {
                method: 'POST',
                body: new URLSearchParams({
                    id: checkbox.dataset.id,
                    token: token,
                }),
            });

            // checkbox.nextElementSibling.classList.toggle('done');
        });
    });

    const deletes = document.querySelectorAll('.delete');
    deletes.forEach(span => {
        span.addEventListener('click', () => {
            if (!confirm('Are you sure?')) {
                return;
            }
            fetch('?action=delete', {
                method: 'POST',
                body: new URLSearchParams({
                    id: span.dataset.id,
                    token: token,
                }),
            });

            span.parentNode.remove();
        });
    });


    const purge = document.querySelector('.purge');
    purge.addEventListener('click', () => {
        if (!confirm('Are you sure?')) {
            return;
        }
        fetch('?action=purge', {
            method: 'POST',
            body: new URLSearchParams({
                token: token,
            }),
        });

        const lis = querySelectorAll('li');
        lis.forEach(li => {
            if (li.children[0].checked) {
                li.remove();
            }
        });
    });
}