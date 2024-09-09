interface IProps {
  msg?: string;
}

function InputErrormsg({ msg }: IProps) {
  return (
    <span className="text-white font-semibold text-sm block bg-red-500 rounded-md my-2 p-2">
      {msg}
    </span>
  );
}

export default InputErrormsg;
