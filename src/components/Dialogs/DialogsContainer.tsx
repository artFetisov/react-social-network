import { actions } from '../../redux/dialogReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reduxStore';
import { MessageType, DialogType } from '../../types/types';

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        messages: state.dialogsPage.messages,
        dialogs: state.dialogsPage.dialogs
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps, { addMessage: actions.addMessage }),
    WithAuthRedirect
)(Dialogs) as React.ComponentType;

type MapStatePropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
}
type MapDispatchPropsType = {
    addMessage: (newMessage: string) => void
}
type OwnPropsType = {}

