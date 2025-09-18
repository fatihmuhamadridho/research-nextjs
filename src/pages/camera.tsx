/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const BarcodeScannerPage: React.FC = () => {
  const [data, setData] = useState('No result');

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>📷 Barcode / QR Scanner</h1>

      <BarcodeScannerComponent
        width={400}
        height={400}
        onUpdate={(err: any, result: any) => {
          if (result) {
            setData(result.getText ? result.getText() : result.text);
          }
        }}
      />

      <p style={{ marginTop: '20px', fontSize: '18px' }}>
        <strong>Result:</strong> {data}
      </p>
    </div>
  );
};

export default BarcodeScannerPage;
