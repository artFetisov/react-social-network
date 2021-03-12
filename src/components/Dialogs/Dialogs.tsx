import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { maxLengthCreator, requiredField } from '../../utils/validators';
import { createField } from '../FormsControls/FormsControls';
import { MessageType, DialogType } from '../../types/types';

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<DialogFormValuesType, DialogFormOwnProps> & DialogFormOwnProps> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<DialogFormValuesTypeKeys>(null, 'newMessage', 'new message', [requiredField, maxLength50], 'textarea', null)}
            </div>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<DialogFormValuesType, DialogFormOwnProps>({
    form: 'newMessage'
})(AddMessageForm);

type DialogFormValuesTypeKeys = Extract<keyof DialogFormValuesType, string>
type DialogFormValuesType = { newMessage: string }
type DialogFormOwnProps = {}

const Dialogs: React.FC<PropsType> = ({ dialogs, messages, addMessage }) => {

    let dialogsElements = dialogs.map(elem => {
        return <DialogItem key={elem.id} name={elem.name} id={elem.id} />
    });

    let messagesElements = messages.map((elem, ind) => {
        return <Message key={ind} message={elem.message} id={elem.id} />
    });

    const onSubmitData = (values: DialogFormValuesType) => {
        addMessage(values.newMessage)
    }

    return (
        <div>
            <AddMessageFormRedux onSubmit={onSubmitData} />
            <div className={s.dialogs}>
                <div className={s.dialogItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    {messagesElements}
                </div>
            </div>
        </div >
    );
}

export default Dialogs;

type PropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    addMessage: (newMessage: string) => void

}