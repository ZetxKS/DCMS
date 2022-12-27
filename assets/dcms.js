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

const $ = require('jquery');
global.$ = global.jQuery = $;

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
        $('form').on("submit", function (e) {
            e.preventDefault;
            let url = $(this).attr('action');
            let method = $(this).attr('method') ?? 'POST';
            let data = $(this).serializeArray();
            $.ajax({
                url: url,
                method: method,
                data: data,
                success: function (data) {
                    window.location.reload();
                },
                error: function (data) {
                    $('body > div.d-flex.vh-100.flex-column.justify-content-center.align-items-center > form > div').prepend(
                        BUI.alert('danger', 'Не верный логин или пароль')
                    );
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
}

let dms = new dcms();
console.log(dms.url);