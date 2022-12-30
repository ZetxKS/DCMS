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
    }
}

class BUI {
    static alert(type, text) {
        return $('<div class="alert alert-' + type + '" role="alert">' + text + '</div>');
    }

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
