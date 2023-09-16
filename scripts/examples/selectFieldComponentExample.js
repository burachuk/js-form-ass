import { Container, SelectField, Typography } from "../components.js";
import { optionsArray } from "./componentsCompositionSelectExample.js";
import { divStyles } from "./styles.js";

const header = new Typography( {
    variant: "h4",
    text: "Реализация отдельным классом"
} )

const selectedLabel = new Typography()
selectedLabel.text = "Выберите поле"

const select = new SelectField( {
    name: "selectComponent",
    options: optionsArray
} )

select.onChange( (e) => {
    selectedLabel.text = e.target.value
} )

// изменить дефолтное отображение пустого выбора
select.dummyOption.text = "*****"

const selectComponentExample = new Container()
    .append(
        header,
        select,
        selectedLabel
    )
    .style( divStyles )


export default selectComponentExample;