const formSet = {
    city: {
        label: "Город",
        type: "radio",
        options: [
            {
                value: true,
                optionLabel: "Указан"
            },
            {
                value: false,
                optionLabel: "Не указан"
            },
            {
                value: "value",
                optionLabel: "Выбрать город"
            }
        ]
    },
    gender: {
        label: "Пол",
        type: "dynamicRadio",
        options: [
            {
                value: true,
                optionLabel: "Указан"
            },
            {
                value: false,
                optionLabel: "Не указан"
            },
            {
                value: "value",
                optionLabel: "Выбрать пол",
                // select: url можно дернуть и также присвоить список
                // или написать компонент который сам будет дергать, это изи
                select: [{
                    // id: value
                    someUuid4: "Боевой вертолёт",
                    thai_id_123: "То-ли девочка, а то-ли виденье",
                    akjsdhf_ussr_1937: "Коммунист"
                }]
            }
        ]
    }
}