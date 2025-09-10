import React from 'react';
import './style.scss';

function LoadingBlock({ enabled }: { enabled: boolean }) {
  if (enabled) {
    return (
      <div className="loading-backdrop">
        <div className="loading" />
      </div>
    );
  }

  return null;
}

export default LoadingBlock;
