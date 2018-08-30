import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'chartjs',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
