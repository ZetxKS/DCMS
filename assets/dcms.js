/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// start the Stimulus application

import './bootstrap';
import jquery from 'jquery';
import 'bootstrap';
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

const $ = require('jquery');
global.$ = global.jQuery = $;

const inpTostr = {
    '_username': 'Логин',
    'password': 'Пароль'
}

class dcms {
    constructor() {
        this.url = window.location.pathname;
        switch (this.url) {
            case "/dcms/login":
                this.login_admin_handler();
                break;
            default:
                this.default()
                break;
        }
    }

    login_admin_handler() {
        $('form').on('submit', function (e) {
            e.preventDefault();
            let url = $(this).attr('action');
            let method = $(this).attr('method') ?? 'POST';
            let data = $(this).serializeArray();
            let check = true;
            $.each(data, function (k,v) {
                if(v.value == '') {
                    BUI.toast('danger', 'Введите ' + inpTostr[v.name], 'Поле ' + inpTostr[v.name] + ' не должно быть пустым');
                    return check = false;
                }
            });

            if(check == false)
                return check;

            $.ajax({
                url: url,
                method: method,
                data: data,
                success: function (data) {
                    window.location.reload();
                },
                error: function (data) {
                    BUI.toast('danger', 'Ошибка', 'Не верный логин или пароль');
                }
            });

            return false;
        });
    }

    default() {
        $('#left_nav button').on('click', function () {
            $('#content').html(
                '<style>' +
                '   #ajax_load_anim {' +
                '       animation: ' +
                '   }' +
                '@keyframes rotate {' +
                '   from {' +
                '       transform: rotateX(0deg);' +
                '   }' +
                '   50% {' +
                '       ' +
                '   }' +
                '   to {' +
                '       transform: translateX(100%);' +
                '   }'+
                '}' +
                '</style>' +
                '<svg id="ajax_load_anim" xmlns="http://www.w3.org/2000/svg" width="100%" style="display: none;" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">\n' +
                '  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>\n' +
                '  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>\n' +
                '</svg>'
            );
            $.ajax({
                url: $(this).attr('ajax-load'),

            })
        });
    }
}

class BUI {
    /* Возвращает алерт */
    static alert(type, text) {
        return $('<div class="alert alert-' + type + '" role="alert">' + text + '</div>');
    }

    /* Показывает уведомление */
    static toast(color, title, text, pos = 'top-0 end-0') {
        let id = (Math.random() + 1).toString(36).substring(7);
        let toast = $('<div id="' + id + '" class="toast text-bg-' + color + '" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><strong class="me-auto">' + title + '</strong><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></div><div class="toast-body">' + text + '</div></div>')
        let container = $('<div class="toast-container position-fixed ' + pos + ' p-3"></div>');

        if($('body div.toast-container').length == 0)
            $('body').append(container);

        $('body div.toast-container').append(toast);

        (new bootstrap.Toast($('#' + id))).show();
    }
}

$(function () {
    let dms = new dcms();
});
