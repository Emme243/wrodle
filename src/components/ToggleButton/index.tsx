interface IToggleButtonProps {
  isActive: boolean;
  handleToggleSwitch: (isActive: boolean) => void;
}

function ToggleButton({ isActive, handleToggleSwitch }: IToggleButtonProps) {
  return (
    <div className="flex">
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" className="peer sr-only" checked={isActive} readOnly />
        <div
          onClick={() => {
            handleToggleSwitch(!isActive);
          }}
          className="peer-checked:bg-green-600 peer-focus:ring-green-300 peer h-6 w-11 rounded-full bg-gradient-to-b from-[#66ffed] to-[#ffeeb2] after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-gradient-to-b after:from-[#ffc123] after:to-[#f8832e] after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:from-[#2b4485] dark:to-[#afcaff] after:dark:from-[#ddedff] after:dark:to-[#3483f9]"
        ></div>
      </label>
    </div>
  );
}

export default ToggleButton;
