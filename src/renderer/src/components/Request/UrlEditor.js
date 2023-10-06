import React from 'react';

const requestMethods = [
    {
        slug: 'get',
        method: 'GET',
    },
    {
        slug: 'post',
        method: 'POST',
    },
    {
        slug: 'put',
        method: 'PUT',
    },
    {
        slug: 'patch',
        method: 'PATCH',
    },
    {
        slug: 'delete',
        method: 'DELETE',
    },
];

const UrlEditor = ({
    url,
    setUrl,
    reqMethod,
    setReqMethod,
    onInputSend,
}) =>{
    return (
        <>
            <form>
                <select
                    id="request-method"
                    value={reqMethod}
                    label="Request Method"
                    onChange={(e) => setReqMethod(e.target.value)}
                    aria-label='Request Method'
                    sx={{ '& > :not(style)': { display: 'inline-block' }, }}
                >
                    {requestMethods.map((option) => (
                        <option key={option.slug} value={option.method}>
                            {option.method}
                        </option>
                    ))}
                </select>
                <input
                    type="text" 
                    id="url" 
                    className="url"
                    aria-label="URL" 
                    variant="outlined" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)}
                    sx={{ '& > :not(style)': { display: 'inline-block' }, }}
                />
                <button 
                    onClick={(e) => onInputSend(e)} 
                    variant='outlined'
                    sx={{ '& > :not(style)': { display: 'inline-block' }, }}
                >
                    Send
                </button>
            </form>
        </>
    );
}

export default UrlEditor;
