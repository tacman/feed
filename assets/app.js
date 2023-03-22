/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

// start the Stimulus application
import './bootstrap';

require('jquery');
global.$ = global.jQuery = $;

import dialogPolyfill from 'dialog-polyfill';
global.dialogPolyfill = dialogPolyfill;

import componentHandler from 'material-design-lite';
global.componentHandler = componentHandler;

import i18next from 'i18next';
global.i18next = i18next;

var moment = require('moment-timezone');
global.moment = moment;

require('jquery.scrollto');

import Handlebars from 'handlebars/dist/cjs/handlebars'
global.Handlebars = Handlebars;

import saveAs from 'file-saver';
global.saveAs = saveAs;

var routes = [];
routes['#test'] = {view: false, query: '/test', title: 'init'};
routes['#login'] = {view: 'view-login', query: false, title: 'login'};
routes['#logout'] = {view: 'view-logout', query: '/logout'};
routes['#profile'] = {view: 'view-profile', query: '/profile', title: 'profile'};
routes['#profile/connections'] = {view: 'view-profile-connections', query: '/profile/connections', title: 'profile'};
routes['#401'] = {view: 'view-401', query: false, title: 'error_401'};
routes['#404'] = {view: 'view-404', query: false, title: 'error_404'};
routes['#500'] = {view: 'view-500', query: false, title: 'error_500'};
routes['#status'] = {view: 'view-status', query: '/status', title: 'status'};

//Feed
routes['#feeds/recent'] = {view: 'view-feeds', viewUnit: 'view-feeds-unit', query: '/feeds?sortField=date_created&sortDirection=DESC', title: 'title.recent_feeds'};
routes['#feeds/subscribed'] = {view: 'view-feeds', viewUnit: 'view-feeds-unit', query: '/feeds?subscribed=1', title: 'title.subscribed_feeds'};
routes['#feeds/unsubscribed'] = {view: 'view-feeds', viewUnit: 'view-feeds-unit', query: '/feeds?unsubscribed=1', title: 'title.unsubscribed_feeds'};
routes['#feeds/witherrors'] = {view: 'view-feeds', viewUnit: 'view-feeds-unit', query: '/feeds?witherrors=1', title: 'title.feeds_witherrors'};

routes['#feeds/search'] = {view: 'view-search-feeds', query: false, title: 'title.search_feeds'};
routes['#feeds/search/result'] = {view: 'view-search-feeds', viewUnit: 'view-feeds-unit', query: '/feeds/search', title: 'title.search_feeds'};

routes['#feed/action/subscribe/{id}'] = {view: false, query: '/feed/action/subscribe/{id}'};

routes['#feeds/category/{id}'] = {view: 'view-feeds', viewUnit: 'view-feeds-unit', query: '/feeds?category={id}'};
routes['#feeds/author/{id}'] = {view: 'view-feeds', viewUnit: 'view-feeds-unit', query: '/feeds?author={id}'};

routes['#feed/{id}'] = {view: 'view-feed-read', query: '/feed/{id}'};

//Item
routes['#items/recent'] = {view: 'view-items', viewUnit: 'view-items-unit', query: '/items?days=7', title: 'title.recent_items'};
routes['#items/unread'] = {view: 'view-items', viewUnit: 'view-items-unit', query: '/items?unread=1', title: 'title.unread_items'};
routes['#items/starred'] = {view: 'view-items', viewUnit: 'view-items-unit', query: '/items?starred=1', title: 'title.starred_items'};

routes['#items/search'] = {view: 'view-search-items', query: false, title: 'title.search_items'};
routes['#items/search/result'] = {view: 'view-search-items', viewUnit: 'view-items-unit', query: '/items/search', title: 'title.search_items'};

routes['#item/action/read/{id}'] = {view: false, query: '/item/action/read/{id}'};
routes['#item/action/star/{id}'] = {view: false, query: '/item/action/star/{id}'};

routes['#items/feed/{id}'] = {view: 'view-items', viewUnit: 'view-items-unit', query: '/items?feed={id}'};
routes['#items/author/{id}'] = {view: 'view-items', viewUnit: 'view-items-unit', query: '/items?author={id}'};
routes['#items/category/{id}'] = {view: 'view-items', viewUnit: 'view-items-unit', query: '/items?category={id}'};

routes['#item/{id}'] = {view: 'view-items-unit', query: '/item/{id}'};

routes['#items/markallasread/all'] = {view: false, query: '/items/markallasread'};
routes['#items/markallasread/unread'] = {view: false, query: '/items/markallasread?unread=1'};
routes['#items/markallasread/starred'] = {view: false, query: '/items/markallasread?starred=1'};
routes['#items/markallasread/feed/{id}'] = {view: false, query: '/items/markallasread?feed={id}'};
routes['#items/markallasread/author/{id}'] = {view: false, query: '/items/markallasread?author={id}'};
routes['#items/markallasread/category/{id}'] = {view: false, query: '/items/markallasread?category={id}'};

//Category
routes['#categories/trendy'] = {view: 'view-categories-trendy', query: '/categories?trendy=1', title: 'title.trendy_categories'};
routes['#categories/excluded'] = {view: 'view-categories', viewUnit: 'view-categories-unit', query: '/categories?excluded=1', title: 'title.excluded_categories'};
routes['#categories/usedbyfeeds'] = {view: 'view-categories', viewUnit: 'view-categories-unit', query: '/categories?usedbyfeeds=1', title: 'title.categories_usedbyfeeds'};

routes['#categories/search'] = {view: 'view-search-categories', query: false, title: 'title.search_categories'};
routes['#categories/search/result'] = {view: 'view-search-categories', viewUnit: 'view-categories-unit', query: '/categories/search', title: 'title.search_categories'};

routes['#category/action/exclude/{id}'] = {view: false, query: '/category/action/exclude/{id}'};

routes['#category/{id}'] = {view: 'view-category-read', query: '/category/{id}'};

//Author
routes['#authors/trendy'] = {view: 'view-authors-trendy', query: '/authors?trendy=1', title: 'title.trendy_authors'};
routes['#authors/excluded'] = {view: 'view-authors', viewUnit: 'view-authors-unit', query: '/authors?excluded=1', title: 'title.excluded_authors'};

routes['#authors/search'] = {view: 'view-search-authors', query: false, title: 'title.search_authors'};
routes['#authors/search/result'] = {view: 'view-search-authors', viewUnit: 'view-authors-unit', query: '/authors/search', title: 'title.search_authors'};

routes['#author/action/exclude/{id}'] = {view: false, query: '/author/action/exclude/{id}'};

routes['#authors/feed/{id}'] = {view: 'view-authors', viewUnit: 'view-authors-unit', query: '/authors?feed={id}'};

routes['#author/{id}'] = {view: 'view-author-read', query: '/author/{id}'};

function ready() {
    Promise.all(readyPromises).then(function() {
        updateOnlineStatus();

        window.addEventListener('online',  function() {
            updateOnlineStatus();
        });

        window.addEventListener('offline', function () {
            updateOnlineStatus();
        });

        var templateNavigation = getTemplate('view-navigation');
        document.querySelector('.mdl-navigation').innerHTML = templateNavigation();

        var templateAside = getTemplate('view-aside');
        document.querySelector('.mdl-layout__drawer').innerHTML = templateAside();

        setPositions();

        window.addEventListener('resize', function() {
            setPositions();
        });

        window.addEventListener('popstate', function() {
            if (lastHistory !== window.location.hash) {
                loadRoute(window.location.hash);
            }
        });

        if (window.location.hash) {
            loadRoute(window.location.hash);
        } else {
            loadRoute('#test');
        }

        $('.mdl-layout__drawer').on('click', '.mdl-list__item a', function() {
            if (document.querySelector('.mdl-layout__drawer').classList.contains('is-visible')) {
                $('.mdl-layout__drawer').removeClass('is-visible');
                $('.mdl-layout__obfuscator').removeClass('is-visible');
            }
        });

        $('.mdl-layout').on('click', '.mdl-layout__obfuscator', function() {
            $('.mdl-layout__drawer').removeClass('is-visible');
            $('.mdl-layout__obfuscator').removeClass('is-visible');
        });

        $('.mdl-layout__header').on('click', '.mdl-layout__drawer-button', function() {
            if (document.querySelector('.mdl-layout__drawer').classList.contains('is-visible')) {
                $('.mdl-layout__drawer').removeClass('is-visible');
                $('.mdl-layout__obfuscator').removeClass('is-visible');
            } else {
                $('.mdl-layout__drawer').addClass('is-visible');
                $('.mdl-layout__obfuscator').addClass('is-visible');
            }
        });

        $(document).on('click', '.load-route', function(event) {
            event.preventDefault();

            loadRoute($(this).attr('href'), {page: $(this).data('page'), q: $(this).data('q'), link: $(this)});
        });

        $(document).on('click', '.dialog', function(event) {
            event.preventDefault();

            if ($(this).hasClass('action-share') && 'share' in navigator) {
                navigator.share({
                    title: decodeURIComponent($(this).data('title')),
                    url: decodeURIComponent($(this).data('url'))
                }).then(function() {
                });

            } else {
                var id = $(this).attr('id');

                if ($('body > dialog[for="' + id + '"]').length === 0) {
                    var html = $('dialog[for="' + id + '"]')[0].outerHTML;
                    $('dialog[for="' + id + '"]').remove();
                    $('body').append(html);
                }

                var dialog = document.querySelector('dialog[for="' + id + '"]');

                if (!dialog.showModal) {
                    dialogPolyfill.registerDialog(dialog);
                }
                dialog.showModal();
            }
        });

        $(document).on('click', 'dialog .close', function(event) {
            if ($(this).hasClass('load-route')) {
            } else if ($(this).attr('target') === '_blank') {
            } else {
                event.preventDefault();
            }
            var id = $(this).parents('.mdl-dialog').attr('for');

            var dialog = document.querySelector('dialog[for="' + id + '"]');
            dialog.close();
        });

        $(document).on('click', 'dialog .close_submit', function() {
            var id = $(this).parents('.mdl-dialog').attr('for');

            var dialog = document.querySelector('dialog[for="' + id + '"]');
            dialog.close();
        });

        $('.mdl-grid').on('click', '.item .mdl-card__title h1 a, .item .mdl-card__supporting-text a', function(event) {
            var ref = $(this).parents('.item');

            $(this).attr('target', '_blank');

            if (ref.hasClass('collapse')) {
                event.preventDefault();
                if (ref.hasClass('collapse')) {
                    ref.removeClass('collapse');
                    ref.addClass('expand');
                } else {
                    ref.removeClass('expand');
                    ref.addClass('collapse');
                }
            }

            if (document.querySelector('body').classList.contains('connected') && document.querySelector('body').classList.contains('online')) {
                var action = ref.find('.action-read');
                if (action.hasClass('read')) {
                } else {
                    action.trigger('click');
                }
            }
        });

        $(document).on('click', '.action-toggle', function(event) {
            event.preventDefault();
            if (document.querySelector('body').classList.contains('collapse')) {
                $('body').removeClass('collapse');
            } else {
                $('body').addClass('collapse');
            }
        });

        $(document).on('click', '.action-toggle-unit', function(event) {
            event.preventDefault();
            var ref = $( $(this).attr('href') );
            if (ref.hasClass('collapse')) {
                ref.removeClass('collapse');
                ref.addClass('expand');
            } else {
                ref.removeClass('expand');
                ref.addClass('collapse');
            }
        });

        $(document).on('click', '.action-up', function(event) {
            event.preventDefault();
            itemUp();
        });

        $(document).on('click', '.action-down', function(event) {
            event.preventDefault();
            itemDown();
        });

        $(document).on('click', '.more', function(event) {
            event.preventDefault();
            document.querySelector('main > .mdl-grid .card-selected').classList.remove('card-selected');
            $(this).parent().parent().prev().addClass('card-selected');

            $(this).parent().parent().remove();
        });

        $('body').on('submit', 'form', function(event) {
            event.preventDefault();

            var form = $(this);
            var id = form.attr('id');

            if (form.hasClass('share-form')) {
                var choice = form.find('input[type="radio"]:checked').val();
                if (choice) {
                    if (choice.indexOf('mailto:') !== -1) {
                        window.location.href = choice;
                    } else {
                        window.open(choice, 'share');
                    }
                }


            } else if (typeof id !== 'undefined' && id.indexOf('form-search-') !== -1) {
                loadRoute(form.attr('action'), {page: 1, q: encodeURIComponent( form.find('input[name="q"]').val() )});

            } else if (form.data('query')) {
                var headers = new Headers({
                    'Authorization': 'Bearer ' + connectionData.token
                });

                var body = null;

                if (window.FormData && form.attr('enctype') === 'multipart/form-data') {
                    body = new FormData();
                    var file = document.getElementById('file');
                    if (file.files.length === 1 && window.FileReader) {
                        body.append('file', file.files[0]);
                    }

                } else {
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    body = form.serialize();
                }

                fetch(apiUrl + form.data('query'), {
                    method: form.attr('method'),
                    mode: 'cors',
                    headers: headers,
                    body: body
                }).then(function(response) {
                    if (response.ok && 200 === response.status) {
                        if (form.data('query') === '/feeds/export') {
                            response.text().then(function(dataReturn) {
                                var blob = new Blob([dataReturn], {type: 'application/xml;charset=utf-8'});
                                saveAs(blob, form.find('#choice').val() + '-' + getDate() + '.opml');
                            });

                        } else {
                            response.json().then(function(dataReturn) {
                                if (typeof dataReturn.entry !== 'undefined') {
                                    if (dataReturn.entry.title) {
                                        setSnackbar(i18next.t(form.attr('method')) + ' ' + dataReturn.entry.title);
                                    }
                                }
                                if (form.data('query') === '/login') {
                                    localStorage.setItem('connection', JSON.stringify(dataReturn.entry));
                                    connectionData = explainConnection(dataReturn.entry);

                                    setSnackbar(i18next.t('login'));
                                }
                                loadRoute(form.attr('action'));
                            });
                        }
                    }
                    if (401 === response.status) {
                        setSnackbar(i18next.t('error_401'));
                    }
                    if (403 === response.status) {
                        loadRoute('#login');
                    }
                    if (404 === response.status) {
                        setSnackbar(i18next.t('error_404'));
                    }
                    if (500 === response.status) {
                        setSnackbar(i18next.t('error_500'));
                    }
                }).catch(function(err) {
                });
            }
        });

        $('.mdl-layout__content').bind('scroll', function() {
            $('main > .mdl-grid').find('.mdl-card').each(function() {
                if ($(this).attr('id')) {
                    var ref = $('#' + $(this).attr('id'));

                    $('main > .mdl-grid .card-selected').removeClass('card-selected');
                    ref.addClass('card-selected');

                    /*if ($(this).hasClass('item')) {
                        var last = $('main > .mdl-grid').find('.item:last').attr('id');
                        if (last === itm_id) {
                            add_items( $('.mdl-navigation').find('li.active').find('a.mdl-navigation__link').attr('href') );
                        }
                    }*/

                    var offset = $(this).offset();
                    if (offset.top + ref.height() - 60 < 0) {
                        if ($(this).hasClass('more')) {
                            actionMore(ref.find('.more'));
                        }

                        if ($(this).hasClass('item') && document.querySelector('body').classList.contains('connected')) {// && itemsDisplay === 'expand'
                            actionRead(ref.find('.action-read'));
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            });
        });
    });
}

function getMomentLocale(languageFinal) {
    return fetch('node_modules/moment/locale/' + languageFinal + '.js').then(function(response) {
        moment.locale(languageFinal);
    }).catch(function(err) {
    });
}

function getTranslation(languageFinal) {
    return fetch('app/translations/' + languageFinal + '.json').then(function(response) {
        if (response.ok) {
            return response.json().then(function(json) {
                i18next.init({
                    debug: false,
                    lng: 'en',
                    resources: {
                        en: {
                            translation: json
                        },
                      }
                });

                Handlebars.registerHelper('trans', function(key) {
                    var result = i18next.t(key);
                    return new Handlebars.SafeString(result);
                });

                Handlebars.registerHelper('encode', function(key) {
                    return encodeURIComponent(key);
                });

                Handlebars.registerHelper('score', function(key) {
                    key = key * 100;
                    return Math.round(key) / 100;
                });

                Handlebars.registerHelper('equal', function(a, b, options) {
                    if (a === b) {
                        return options.fn(this);
                    } else {
                        return options.inverse(this);
                    }
                });
            });
        } else {
            Promise.reject();
        }
    }).catch(function(err) {
    });
}

function getTemplate(key) {
    return Handlebars.compile( $('#' + key).text() );
}

function loadFile(url) {
    return fetch(url).then(function(response) {
        if (response.ok) {
            return response.text().then(function(text) {
                document.querySelector('body').innerHTML += text;
            });
        } else {
            Promise.reject();
        }
    }).catch(function(err) {
    });
}

function explainConnection(connection) {
    if (typeof connection === 'undefined' || null === connection) {
        connection = {id: false, token: false, member: {id: false, administrator: false, member: false}};

        $('body').removeClass('connected');
        $('body').addClass('anonymous');

        $('body').removeClass('administrator');
        $('body').addClass('not_administrator');

    } else {
        $('body').removeClass('anonymous');
        $('body').addClass('connected');

        fetch(apiUrl + '/connection/' + connection.id, {
            method: 'PUT',
            mode: 'cors',
            headers: new Headers({
                'Authorization': 'Bearer ' + connection.token,
                'Content-Type': 'application/json'
            })
    	}).then(function(response) {
            if (response.ok) {
                response.json().then(function(dataReturn) {
                    if (dataReturn.entry.member.administrator) {
                        $('body').removeClass('not_administrator');
                        $('body').addClass('administrator');
                    }

                    localStorage.setItem('connection', JSON.stringify(dataReturn.entry));

                    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
                        navigator.serviceWorker.ready.then(function(ServiceWorkerRegistration) {
                        }).catch(function() {
                        });
                    }
                });
            }
        }).catch(function(err) {
        });
    }
    return connection;
}

function loadRoute(key, parameters) {
    if (typeof parameters === 'undefined') {
        parameters = {};
    }

    if (typeof parameters.page === 'undefined') {
        parameters.page = false;
    }

    if (typeof parameters.q === 'undefined') {
        parameters.q = false;
    }

    if (typeof parameters.link === 'undefined') {
        parameters.link = false;
    }

    if (typeof parameters.snackbar === 'undefined') {
        parameters.snackbar = true;
    }

    var replaceId = false;

    var parts = key.split('/');
    for(var i in parts) {
        if ($.isNumeric(parts[i])) {
            key = key.replace(parts[i], '{id}');
            replaceId = parts[i];
            break;
        }
    }

    if (key in routes || replaceId) {
        var route = routes[key];
        var url = false;

        if (route.query) {
            url = apiUrl + route.query;
            if (parameters.page) {
                if (url.indexOf('?') !== -1) {
                    url = url + '&page=' + parameters.page;
                } else {
                    url = url + '?page=' + parameters.page;
                }
            }
            if (parameters.q) {
                if (url.indexOf('?') !== -1) {
                    url = url + '&q=' + parameters.q;
                } else {
                    url = url + '?q=' + parameters.q;
                }
            }
            if (replaceId) {
                url = url.replace('{id}', replaceId);
                key = key.replace('{id}', replaceId);
            }
        }

        if (route.view) {
            if (!parameters.page || parameters.page === 1) {
                scrollTo('#top');
                document.querySelector('main > .mdl-grid').innerHTML = '<div class="mdl-spinner mdl-js-spinner is-active"></div>';
                //componentHandler.upgradeDom('MaterialSpinner', 'mdl-spinner');
            }

            if (key !== '#401' && key !== '#404' && key !== '#500') {
                if (key !== window.location.hash) {
                    history.pushState({key: key}, null, key);
                    lastHistory = window.location.hash;
                }
            }

            if (route.title) {
                window.document.title = i18next.t(route.title);
            }
        }

        if (!route.query && route.view) {
            var dataReturn = {};
            dataReturn.connectionData = connectionData;

            var template = getTemplate(route.view);
            document.querySelector('main > .mdl-grid').innerHTML = template(dataReturn);

        } else if (route.query) {
            fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: new Headers({
                    'Authorization': 'Bearer ' + connectionData.token,
                    'Content-Type': 'application/json'
                })
        	}).then(function(response) {
                if (response.ok && 200 === response.status) {
                    response.json().then(function(dataReturn) {
                        dataReturn.connectionData = connectionData;

                        dataReturn.current_key = key;
                        dataReturn.current_key_markallasread = key.replace('#items', '#items/markallasread');
                        dataReturn.current_q = parameters.q ? decodeURIComponent(parameters.q) : '';

                        if (route.title) {
                            dataReturn.current_title = route.title;
                        }

                        /*if (Object.prototype.toString.call( dataReturn.entries ) === '[object Array]' && typeof route.store === 'boolean' && route.store) {
                            for(i in dataReturn.entries) {
                                if (dataReturn.entries.hasOwnProperty(i)) {
                                    localStorage.setItem(dataReturn.entries_entity + '_' + dataReturn.entries[i].id, JSON.stringify(dataReturn.entries[i]));
                                }
                            }
                        }*/

                        if (typeof dataReturn.unread !== 'undefined') {
                            var badge = 0;
                            if (dataReturn.unread > 0) {
                                if (dataReturn.unread > 99) {
                                    badge = '99+';
                                } else {
                                    badge = dataReturn.unread;
                                }
                                document.querySelector('.count-unread').setAttribute('data-badge', badge);
                                $('.count-unread').addClass('mdl-badge');
                            } else {
                                document.querySelector('.count-unread').removeAttribute('data-badge');
                                $('.count-unread').removeClass('mdl-badge');
                            }
                        }

                        if (route.view) {
                            if (typeof dataReturn.entry === 'object' && typeof dataReturn.entry_entity === 'string') {
                                if (typeof dataReturn.entry.title === 'string') {
                                    window.document.title = dataReturn.entry.title + ' (' + i18next.t(dataReturn.entry_entity) + ')';
                                }
                            }

                            if (!parameters.page || parameters.page === 1) {
                                var template = getTemplate(route.view);
                                document.querySelector('main > .mdl-grid').innerHTML = template(dataReturn);
                            }

                            if (Object.prototype.toString.call( dataReturn.entries ) === '[object Array]' && typeof route.viewUnit === 'string') {
                                var templateUnit = getTemplate(route.viewUnit);

                                for(i in dataReturn.entries) {
                                    if (dataReturn.entries.hasOwnProperty(i)) {
                                        document.querySelector('main > .mdl-grid').innerHTML += templateUnit({connectionData: connectionData, entry: dataReturn.entries[i]});
                                    }
                                }

                                if (route.title) {
                                    window.document.title = i18next.t(route.title) + ' (' + dataReturn.entries_total + ')';
                                }
                                $('.count').text(dataReturn.entries_total);

                                if (dataReturn.entries_page_next) {
                                    var template_more = getTemplate('view-more');
                                    document.querySelector('main > .mdl-grid').innerHTML += template_more(dataReturn);
                                }
                            }

                            if (Object.prototype.toString.call( dataReturn.entries ) === '[object Array]') {
                                $('body').removeClass('no_entries');
                            } else {
                                $('body').addClass('no_entries');
                            }

                            $('main > .mdl-grid').find('img.proxy').each(function() {
                                var img = $(this);
                                if (img.data('src')) {
                                    $(this).attr('src', $(this).attr('data-src'));
                                    $(this).removeAttr('data-src');
                                    $(this).removeClass('proxy');
                                }
                            });

                            $('main > .mdl-grid').find('.timeago').each(function() {
                                var result = moment( $(this).data('date') ).add(timezone, 'hours');
                                $(this).attr('title', result.format('LLLL'));
                                $(this).text(result.fromNow());
                            });

                            //componentHandler.upgradeDom('MaterialMenu', 'mdl-menu');
                        } else {
                            if (parameters.link) {
                                parameters.link.text(i18next.t(dataReturn.action_reverse));
                                parameters.link.addClass(dataReturn.action);
                                parameters.link.removeClass(dataReturn.action_reverse);
                            }
                            if (typeof dataReturn.entry === 'object' && typeof dataReturn.action === 'string') {
                                if (parameters.snackbar) {
                                    setSnackbar(i18next.t(dataReturn.action) + ' ' + dataReturn.entry.title);
                                }
                            }
                            /*if (dataReturn.entry_entity === 'Item' && dataReturn.action === 'read') {
                                localStorage.removeItem(dataReturn.entry_entity + '_' + dataReturn.entry.id);
                            }*/
                        }

                        if (route.query === '/test') {
                            loadRoute('#items/unread');
                        }

                        if (route.query === '/logout') {
                            localStorage.removeItem('connection');
                            $('body').removeClass('connected');
                            $('body').addClass('anonymous');
                            loadRoute('#login');
                            setSnackbar(i18next.t('logout'));
                        }
                    });
                }
                if (403 === response.status) {
                    localStorage.removeItem('connection');
                    $('body').removeClass('connected');
                    $('body').addClass('anonymous');
                    loadRoute('#login');
                    setSnackbar(i18next.t('logout'));
                }
                if (404 === response.status) {
                    loadRoute('#404');
                }
                if (500 === response.status) {
                    loadRoute('#500');
                }
            }).catch(function(err) {
            });
        } else {
            loadRoute('#404');
        }
    } else {
        loadRoute('#404');
    }
}

function setSnackbar(message) {
    snackbarContainer.MaterialSnackbar.showSnackbar({message: message, timeout: 1000});
}

function setPositions() {
    var _window_height = $(window).height();
    var _offset = $('.mdl-layout__content').offset();
    var _height = _window_height - _offset.top;
    $('.mdl-layout__content').css({ 'height': _height});
    $('main > .mdl-grid').css({ 'padding-bottom': _height});
}

function scrollTo(anchor) {
    $('.mdl-layout__content').scrollTo(anchor);
}

function itemUp() {
    var item = document.querySelector('.mdl-grid .card-selected');
    if (null !== item) {
        var prev = document.querySelector('#' + item.getAttribute('id')).previousElementSibling;
        if (null !== prev) {
            scrollTo('#' + prev.getAttribute('id'));
        }
    }
}
function itemDown() {
    var itm_id = false;
    var next = false;
    if ($('.mdl-grid .card-selected').length === 0) {
        itm_id = $('.mdl-grid').find('.mdl-card:first').attr('id');
        next = $('#' + itm_id).attr('id');
        $('#' + itm_id).addClass('card-selected');
    } else {
        itm_id = document.querySelector('.mdl-grid .card-selected').getAttribute('id');
        next = $('#' + itm_id).next().attr('id');
    }
    if (next) {
        scrollTo('#' + next);

        if ($('#' + next).hasClass('more')) {
            actionMore($('#' + next).find('.more'));
        }

        if ($('#' + next).hasClass('item') && document.querySelector('body').classList.contains('connected')) {
            actionRead($('#' + next).find('.action-read'));
        }
    }
}

function actionMore(liknActionMore) {
    if (liknActionMore.hasClass('progress')) {
    } else {
        liknActionMore.addClass('progress');
        liknActionMore.trigger('click');
        //loadRoute(liknActionMore.attr('href'));
    }
}

function actionRead(liknActionRead) {
    if (liknActionRead.hasClass('read')) {
    } else if (liknActionRead.hasClass('unread')) {
    } else if (liknActionRead.hasClass('progress')) {
    } else {
        liknActionRead.addClass('progress');
        loadRoute(liknActionRead.attr('href'), {link: liknActionRead, snackbar: false});
    }
}

function updateOnlineStatus() {
    if (navigator.onLine) {
        $('body').removeClass('offline');
        $('body').addClass('online');
    } else {
        $('body').removeClass('online');
        $('body').addClass('offline');
    }
}

function getDate() {
    var d = new Date();
    var utc = d.getFullYear() + '-' + addZero(d.getMonth() + 1) + '-' + addZero(d.getDate());
    return utc;

    function addZero(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }
}

var readyPromises = [];

//var applicationServerKey;

var files = [
    'app/views/misc.html',
    'app/views/member.html',
    'app/views/item.html',
    'app/views/feed.html',
    'app/views/category.html',
    'app/views/author.html',
];

var timezone = new Date();
timezone = -timezone.getTimezoneOffset() / 60;

var lastHistory = false;

var language = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
if (language) {
    language = language.substr(0, 2);
}

var hostName = window.location.hostname;
var apiUrl = '//' + hostName;
if (window.location.port) {
    apiUrl += ':' + window.location.port;
}

apiUrl += '/api';

if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    navigator.serviceWorker.register('serviceworker.js').then(function() {
    }).catch(function() {
    });
}

var connectionData = explainConnection(JSON.parse(localStorage.getItem('connection')));

var snackbarContainer = document.querySelector('.mdl-snackbar');

var languages = ['en', 'fr'];
var languageFinal = 'en';
if (languages.indexOf(language)) {
    languageFinal = language;
}

if (languageFinal !== 'en') {
    readyPromises.push(getMomentLocale(languageFinal));
}

readyPromises.push(getTranslation(languageFinal));

for(var i in files) {
    if (files.hasOwnProperty(i)) {
        readyPromises.push(loadFile(files[i]));
    }
}

if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}

var gKey = false;

document.addEventListener('keyup', function(event) {
    var keycode = event.which || event.keyCode;

    if ($(event.target).parents('form').length === 0) {
        //g
        if (keycode === 71) {
            gKey = true;
        } else {
            gKey = false;
        }
    }
});

document.addEventListener('keydown', function(event) {
    var keycode = event.which || event.keyCode;

    if ($(event.target).parents('form').length === 0) {
        //g then a
        if (gKey && keycode === 65) {
            loadRoute('#items/recent');

        //g then u
        } else if (gKey && keycode === 85) {
            loadRoute('#items/unread');

        //g then s
        } else if (gKey && keycode === 83) {
            loadRoute('#items/starred');

        //g then f
        } else if (gKey && keycode === 70) {
            loadRoute('#feeds/recent');

        //g then c
        } else if (gKey && keycode === 67) {
            loadRoute('#categories/recent');

        //t
        } else if (keycode === 84) {
            event.preventDefault();
            scrollTo('#top');

        //2
        } else if (keycode === 50) {
            event.preventDefault();
            if (itemsDisplay === 'collapse') {
                itemsExpand();
            }

        //v
        } else if (keycode === 86) {
            var href = $('.mdl-grid .card-selected').find('h1').find('a').attr('href');
            var name = $('.mdl-grid .card-selected').attr('id');
            window.open(href, 'window_' + name);

        //m
        } else if (keycode === 77 && $('body').hasClass('connected') && $('body').hasClass('online')) {
            if ($('.mdl-grid .card-selected').length > 0) {
                $('.mdl-grid .card-selected').find('.action-read').trigger('click');
            }

        //shift + s
        } else if (event.shiftKey && keycode === 83) {
            if ($('.mdl-grid .card-selected').length > 0) {
                $('.mdl-grid .card-selected').find('.action-share').trigger('click');
            }

        //s
        } else if (keycode === 83 && $('body').hasClass('connected') && $('body').hasClass('online')) {
            if ($('.mdl-grid .card-selected').length > 0) {
                $('.mdl-grid .card-selected').find('.action-star').trigger('click');
            }

        //o or enter
        } else if (keycode === 79 || keycode === 13) {
            if ($('.mdl-grid .card-selected').length > 0) {
                var ref = $( '#' + $('.mdl-grid .card-selected').attr('id') );
                if (ref.hasClass('collapse')) {
                    ref.removeClass('collapse');
                    ref.addClass('expand');
                } else {
                    ref.removeClass('expand');
                    ref.addClass('collapse');
                }
                //$('.mdl-grid .card-selected').find('.action-toggle-unit').trigger('click');
            }

        } else if (keycode === 65 && $('body').hasClass('connected') && $('body').hasClass('online')) {
            //shift + a
            if (event.shiftKey) {
                if ($('#dialog-mark_all_as_read').length > 0) {
                    $('#dialog-mark_all_as_read').trigger('click');
                }
            //a
            } else {
                //loadRoute('#feed/create');
            }

        //slash
        } else if (keycode === 191) {
            event.preventDefault();
            if ($('input[name="q"]').length > 0) {
                $('input[name="q"]').focus();
            }

        //nothing when meta + k
        } else if (event.metaKey && keycode === 75) {

        //nothing when ctrl + k
        } else if (event.ctrlKey && keycode === 75) {

        //k or p or shift + space
        } else if (keycode === 75 || keycode === 80 || (keycode === 32 && event.shiftKey)) {
            itemUp();

        //j or n or space
        } else if (keycode === 74 || keycode === 78|| keycode === 32) {
            itemDown();

        //r
        } else if (keycode === 82) {
            if (window.location.hash) {
                loadRoute(window.location.hash);
            }
        }
    }
});