export const formSet = {
    // key: props
    city: {
        label: "Город",
        type: "select",
        // если селект, то и так понятно, что должны быть включены варианты указан/неуказан и собсна сам выбор
        options: [
            { msk: "Москва" },
            { stu: "Ступино" },
            { someCity: "Село Кукуево" }
        ]
    },
    gender: {
        label: "Пол",
        type: "select",
        options: [
            // id: value
            { someUuid4: "Боевой вертолёт" },
            { thai_id_123: "То-ли девочка, а то-ли виденье" },
            { akjsdhf_ussr_1937: "Коммунист" }
        ]
    },
    phone: {
        label: "Есть Телефон?",
        type: "checkbox"
    },
    hasSomething: {
        label: "Есть анкета?",
        type: "checkbox"
    },
    isActive: {
        label: "Активный?", // или пассивный?
        type: "checkbox"
    }
}
