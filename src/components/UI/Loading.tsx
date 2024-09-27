import { Spinner } from '@nextui-org/react';
import React from 'react';

const Loading = () => {
    return (
        <div className="bg-black/10 h-screen fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center"><Spinner size="lg" /></div>
    );
};

export default Loading;