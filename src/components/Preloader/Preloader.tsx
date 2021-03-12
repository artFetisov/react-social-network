import React from 'react';
import preloader from '../../assets/6.gif'

const Preloader = () => {
    return (
        <div>
            <img src={preloader} alt={'Загрузка'} />
        </div>
    );
}

export default Preloader;