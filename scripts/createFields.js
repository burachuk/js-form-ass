
    function createField(parentName) {
        var field = document.createElement('div');
        field.classList.add('field');

        var header = document.createElement('div');
        header.classList.add('field-header');


        var name = document.createElement('div');
        name.classList.add('name');
        name.textContent = parentName;

        var andBtn = document.createElement('button');
        andBtn.classList.add('and');
        andBtn.textContent = 'И';
        andBtn.style = "margin-left: auto; margin-right: 5px";
        andBtn.type = "button";

        var orBtn = document.createElement('button');
        orBtn.classList.add('or');
        orBtn.textContent = 'Или';
        orBtn.style = "margin-right: 5px";
        orBtn.type = "button";

        var notBtn = document.createElement('button');
        notBtn.classList.add('not');
        notBtn.textContent = 'НЕ';
        notBtn.style = "margin-right: 5px";
        notBtn.type = "button";

        var removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-field');
        removeBtn.textContent = 'X';
        removeBtn.style = "margin-right: 5px";
        removeBtn.type = "button";

        header.appendChild(name);
        header.appendChild(andBtn);
        header.appendChild(orBtn);
        header.appendChild(notBtn);
        header.appendChild(removeBtn);

        var body = document.createElement('div');
        body.classList.add('field-body');

        var selectOptions = [{
                value: '',
                text: 'Выберите условие',
            },
            {
                value: 'segment',
                text: 'Находится в сегменте',
            },
            {
                value: 'whatsapp',
                text: 'Было входящее из WhatsApp',
            },
            {
                value: 'grade',
                text: 'Выдан диплом',
            },
            {
                value: 'city',
                text: 'Город',
            }, {
                value: 'lastActivity',
                text: 'Дата последней активности',
            }, {
                value: 'registerDate',
                text: 'Дата регистрации',
            }, {
                value: 'cash',
                text: 'Денег принес',
            }, {
                value: 'cashPerReriod',
                text: 'Денег принес за период',
            }, {
                value: 'birthday',
                text: 'День рождения',
            }, {
                value: 'deposit',
                text: 'Депозит',
            }, {
                value: 'bonusDeposit',
                text: 'Депозит - бонусный',
            }, {
                value: 'hasSoc',
                text: 'Имеет аккаунт в соцсетях',
            }, {
                value: 'hasOdrder',
                text: 'Имеет заказ',
            }, {
                value: 'hasPurchase',
                text: 'Имеет покупку',
            }, {
                value: 'hasVisiting',
                text: 'Имеет посещение',
            }, {
                value: 'hasPhone',
                text: 'Имеет телефон',
            }, {
                value: 'canSendVkMessage',
                text: 'Можно отправить VK-сообщение',
            }, {
                value: 'canSendViberMessage',
                text: 'Можно отправить Viber-сообщение',
            }, {
                value: 'canSendWhatsappMessage',
                text: 'Можно отправить WhatsApp-сообщение сейчас',
            }, {
                value: 'canSendVkMessageByCommunity',
                text: 'Можно отправлять VK-сообщения от сообщества',
            }, {
                value: 'unsubscribed',
                text: 'Отписался',
            }, {
                value: 'hasMailing',
                text: 'Отправлялось письмо',
            }, {
                value: 'personManager',
                text: 'Персональный менеджер',
            }, {
                value: 'hasTG',
                text: 'Подключен Telegram',
            }, {
                value: 'hasTGBot',
                text: 'Подключен Telegram-бот',
            }, {
                value: 'gender',
                text: 'Пол',
            }, {
                value: 'visitedPage',
                text: 'Посетил страницу',
            }, {
                value: 'lastMailing',
                text: 'Последняя рассылка отправлялась дней назад',
            }, {
                value: 'passedTesting',
                text: 'Проходил тестирование',
            }, {
                value: 'averageCheck',
                text: 'Средний чек',
            }, {
                value: 'subscribeStatus',
                text: 'Статус подписки',
            }, {
                value: 'Country',
                text: 'Страна',
            }, {
                value: 'phoneConfirmed',
                text: 'Телефон подтвержден',
            }, {
                value: 'webinarParticipant',
                text: 'Участник вебинара',
            }, {
                value: 'trainingParticipant',
                text: 'Участник тренинга',
            }, {
                value: 'timeZone',
                text: 'Часовой пояс',
            }, {
                value: 'emailConfirmed',
                text: 'Эл.адрес подтвержден',
            }, {
                value: 'emailHas',
                text: 'Эл.адрес содержит',
            }, {
                value: 'isActive',
                text: 'Является активным',
            },
        ];

        var select = document.createElement('select');
        select.id = 'select-id';

        for (var i = 0; i < selectOptions.length; i++) {
            var option = document.createElement('option');
            var selectBox = document.getElementById('first_elem_select');

            option.value = selectOptions[i].value;
            option.textContent = selectOptions[i].text;

            select.appendChild(option);
        }
        body.appendChild(select);
        field.appendChild(header);
        field.appendChild(body);

        return field;
    }


    // обработчик клика на кнопку "AND"
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('and')) {
            var parentName = "И";
            var field = createField(parentName);
            field.id = 'and-field';
            var selectValue = document.getElementById('and-field');
            event.target.parentNode.parentNode.querySelector('.field-body').appendChild(field);
        }
    });


    // обработчик клика на кнопку "OR"
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('or')) {
            var parentName = "Или";
            var field = createField(parentName);
            event.target.parentNode.parentNode.querySelector('.field-body').appendChild(field);

        }
    });

    // обработчик клика на кнопку "NOT"
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('not')) {
            var parentName = "НЕ";
            var field = createField(parentName);
            event.target.parentNode.parentNode.querySelector('.field-body').appendChild(field);

        }
    });

    // обработчик клика на кнопку "Remove"
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-field')) {
            event.target.parentNode.parentNode.remove(event.target.parentNode);
        }
    });
