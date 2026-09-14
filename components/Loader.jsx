import React from 'react';


const Loader = ({ text }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink">
            <div className="animate-spin rounded-full h-14 w-14 border border-ivory/10 border-b-champagne mb-5" />
            {text && <span className="font-sans text-ivory/70 text-xs uppercase tracking-[0.3em]">{text}</span>}
        </div>
    );
};

export default Loader;
