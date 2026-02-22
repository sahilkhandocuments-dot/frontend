import React from 'react';

export default function TestPage() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontSize: '24px'
        }}>
            <h1>🎉 React is Working!</h1>
            <p>Frontend server is running correctly on port 3002</p>
            <div style={{marginTop: '20px', fontSize: '16px'}}>
                <p>✅ React App Loaded</p>
                <p>✅ Components Rendering</p>
                <p>✅ Styles Applied</p>
            </div>
        </div>
    );
}
