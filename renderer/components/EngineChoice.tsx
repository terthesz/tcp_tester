import { useEffect } from 'react';
import { EngineChoiceHandler } from '../handlers';

const EngineChoice = () => {
  useEffect(() => {
    EngineChoiceHandler.setup();
  }, []);

  return (
    <div className='mt-4 ml-2 flex' id='engine-choice'>
      <p id='net'>Net (node.js)</p>
      <p id='socket-io'>Socket.io</p>
    </div>
  );
};

export default EngineChoice;
