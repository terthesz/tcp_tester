import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import InputField from '../components/InputField';
import { ConnectionHandler, IpAddressHandler } from '../handlers';

const home: NextPage = () => {
  const [address, set_address] = useState('');

  useEffect(() => {
    ConnectionHandler.init(set_address);
  }, []);

  return (
    <>
      <div className='m-0 flex flex-col w-[20rem]' id='input-field-holder'>
        <InputField id='ip-addr' on_submit={IpAddressHandler.on_submit_event} />
      </div>

      {address}
    </>
  );
};

export default home;
