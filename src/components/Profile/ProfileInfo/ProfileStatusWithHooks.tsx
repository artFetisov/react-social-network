import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => setEditMode(true);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            <b>Status</b> :
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || 'no status'}</span>
                </div>}

            {editMode
                && <div>
                    <span>
                        <input onChange={onChangeStatus} autoFocus={true}
                            onBlur={deactivateEditMode} defaultValue={status} />
                    </span>
                </div>}
        </div>
    );
}

export default ProfileStatusWithHooks;