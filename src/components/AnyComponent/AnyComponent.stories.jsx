import {AnyComponent} from '.';
import {MyProvider} from '../../context/MyContext.jsx'
export default {
    title: 'Components/AnyComponent',
    component: AnyComponent,
}

export const Default = {
    render: (args) => <MyProvider {...args}>
        <AnyComponent {...args}/>
        <AnyComponent {...args}/>
    </MyProvider>,
}