import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import AddressInputField from '../components/AddressInputField';
import { ConnectionHandler, IpAddressHandler } from '../handlers';
import RunButton from '../components/RunButton';
import EngineChoice from '../components/EngineChoice';

const home: NextPage = () => {
  const [address, set_address] = useState('');

  useEffect(() => {
    ConnectionHandler.init(set_address);
  }, []);

  return (
    <>
      <div className='m-0 flex relative'>
        <AddressInputField id='ip-addr' on_submit={IpAddressHandler.on_submit_event} />
        <div className='flex absolute left-[19rem] bottom-0'>
          <RunButton />
        </div>
      </div>
      <EngineChoice />

      {address}
    </>
  );
};

export default home;
