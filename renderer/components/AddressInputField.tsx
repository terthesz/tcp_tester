const InputField = ({ id, on_submit }) => {
  return (
    <div id='input-field-holder'>
      <p className='opacity-0 w-full text-center text-sm text-red-500 mb-1'>Invalid IP address.</p>
      <input
        type='text'
        name={id}
        id={id}
        placeholder='ip address and port'
        onBlur={on_submit}
        onKeyDown={function (e) {
          if (e.key === 'Enter') {
            e.preventDefault();

            on_submit(e);
          }
        }}
      />
    </div>
  );
};

export default InputField;
